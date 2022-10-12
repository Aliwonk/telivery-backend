import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AddRoleDto } from './dto/add-role.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post('')
  async addRole(@Body() data: AddRoleDto) {
    // const user = await this.userRepository.findOne({
    //   where: { id: data.userId },
    // });
    // return this.rolesService.addRole({ value: data.value, user });
  }

  @Get('/:value')
  geByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
