import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { Roles } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  private async checkValueRole(valueRole: string | any) {
    const valueRoles = ['ADMIN', 'OWNER', 'EMPLOYEE', 'USER'];
    let check: boolean;

    // check value and type valueRole
    let cache = 0;
    valueRoles.forEach((value, index) => {
      if (typeof valueRole === 'string') {
        if (valueRole !== value) return (check = false);
        check = true;
      } else {
        // check value array
        const lengthValue = valueRole.length;
        const result = valueRoles.filter((item) => item === valueRole[index]);
        if (result.length === 1) cache += 1;
        // if all value false
        if (cache !== lengthValue) return (check = false);
        check = true;
      }
    });
    return check;
  }
  async addRole(value: string | any, idUser?: number) {
    const validData = await this.checkValueRole(value);
    if (!validData) throw new Error('Incorrect value');

    // get user by id from database

    const user = await this.usersRepository.findOne({ where: { id: idUser } });
    if (typeof value === 'object') {
      value.forEach((role: string) => {
        const data: CreateRoleDto = {
          value: role,
          user,
        };
        this.rolesRepository.save(data);
      });
    } else {
      const data: CreateRoleDto = {
        value,
        user,
      };
      this.rolesRepository.save(data);
    }
  }

  async getRoleByValue(value: string) {
    return await this.rolesRepository.find({
      where: { value },
      relations: { user: true },
    });
  }

  async getRoleByUser(user: User) {
    return await this.rolesRepository.find({
      where: { user: user[0] },
    });
  }
}
