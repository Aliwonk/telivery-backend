import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}
  async createUser(userData: CreateUserDto, role: string | any = 'USER') {
    try {
      const user = await this.usersRepository.save(userData);
      this.rolesService.addRole(role, user.id);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserByPhone(phone: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { phone },
      relations: { roles: true, ownershops: true },
    });
    return user;
  }
  async getUserById(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: { roles: true, ownershops: true },
    });
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find({
      relations: { roles: true, ownershops: true },
    });
    return users;
  }

  async updateUser(idUser: number, data: UpdateUserDto) {
    try {
      const userUpdate = await this.usersRepository.update(idUser, data);
      if (userUpdate.affected !== 1)
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      throw new HttpException('Update successfully', HttpStatus.OK);
    } catch (error) {
      if (!error.status) {
        throw new HttpException('Incorrect data', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, error.status);
    }
  }
}
