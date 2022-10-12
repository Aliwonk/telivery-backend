import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';
import { CreateShopDto } from 'src/shop/dto/create-shop.dto';
import { ShopService } from 'src/shop/shop.service';
import { AuthUserDto } from 'src/users/dto/auth-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as fs from 'fs';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private rolesService: RolesService,
    private shopService: ShopService,
    private filesService: FilesService,
  ) {}
  private readonly saltBcrypt = 10;

  private async checkEpmtyData(data: any): Promise<boolean> {
    const keys = ['password', 'phone', 'firstName'];
    for (let i = 0; i < keys.length; i++) {
      const element = data.hasOwnProperty(keys[i]);
      if (!element) return false;
      return true;
    }
  }

  private async generateToken(userData: User) {
    const payload = {
      id: userData.id,
      phone: userData.phone,
      roles: userData.roles,
    };
    return await this.jwtService.signAsync(payload);
  }

  async registration(userData: CreateUserDto) {
    // check user data

    const emptyValue = await this.checkEpmtyData(userData);
    if (!emptyValue)
      throw new HttpException('Missing value', HttpStatus.BAD_REQUEST);

    // check user exist

    const userExist = await this.usersService.getUserByPhone(userData.phone);
    if (userExist)
      throw new HttpException(
        'User with phone with this number already exists',
        HttpStatus.CONFLICT,
      );

    // create user

    try {
      const genSalt = await bcrypt.genSaltSync(this.saltBcrypt);
      const hashPassword = await bcrypt.hash(userData.password, genSalt);
      const user = await this.usersService.createUser({
        ...userData,
        password: hashPassword,
      });

      // return token user
      const userDataWithRoles = await this.usersService.getUserById(user.id);
      // get roles value user
      const roles = [];
      for (const key in userDataWithRoles.roles) {
        if (
          Object.prototype.hasOwnProperty.call(userDataWithRoles.roles, key)
        ) {
          const element = userDataWithRoles.roles[key];
          roles.push(element.value);
        }
      }
      return {
        roles,
        token: await this.generateToken(userDataWithRoles),
      };
    } catch (error) {
      switch (error.message) {
        case 'Incorrect value':
          throw new HttpException('Incorrect value', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async validateUser(userData: AuthUserDto) {
    const user = await this.usersService.getUserByPhone(userData.phone);
    if (!user)
      throw new HttpException(
        'User not found. Possibly wrong password or number',
        HttpStatus.NOT_FOUND,
      );
    const passwordEquals = await bcrypt.compareSync(
      userData.password,
      user.password,
    );
    if (user && passwordEquals) return await this.generateToken(user);
    throw new HttpException(
      'Invalid phone number or password',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async storeRegistration(storeData: CreateShopDto) {
    // check shop exist
    const shopExist = await this.shopService.getShopByName(storeData.name);

    if (shopExist) {
      storeData.files.forEach((file) => {
        fs.unlink(file.path, (err) => {
          console.log(err);
        });
      });
      throw new HttpException('Shop already exist', HttpStatus.CONFLICT);
    }
    // check user exist
    const userExist = await this.usersService.getUserByPhone(
      storeData.owner.phone,
    );
    if (userExist) {
      // check role user exist
      const roleExist = await this.rolesService.getRoleByUser(userExist);

      let countOwnerRole = 0;
      // check role owner
      roleExist.forEach(async (role) => {
        if (role.value === 'OWNER') {
          countOwnerRole += 1;
          if (countOwnerRole >= 1) {
            const shop = await this.shopService.createShop({
              ...storeData,
              owner: userExist,
            });
            console.log(shop);
            this.filesService.createShopFile({
              path: storeData.files[1].path,
              shop,
            });
          } else if (countOwnerRole === 0) {
            this.rolesService.addRole(['OWNER'], userExist.id);
            this.shopService.createShop({
              ...storeData,
              owner: userExist,
            });
          }
        }
      });
      return {
        roles: ['USER', 'OWNER'],
        token: await this.generateToken(userExist),
      };
    } else {
      const user = await this.usersService.createUser(storeData.owner, [
        'USER',
        'OWNER',
      ]);
      this.shopService.createShop({
        ...storeData,
        owner: user,
      });
      return {
        roles: ['USER', 'OWNER'],
        token: await this.generateToken(user),
      };
    }
  }
}
