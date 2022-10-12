import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Roles } from 'src/auth/guards/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Roles('USER')
  @UseGuards(RolesGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const userReq: any = req.user;
    const user = await this.usersService.getUserById(userReq.id);
    delete user.password;
    return user;
  }

  @Roles('USER')
  @UseGuards(RolesGuard)
  @Post('update')
  async updateUser(@Req() req: Request, @Body() updateData: UpdateUserDto) {
    const user: any = req.user;
    return this.usersService.updateUser(user.id, updateData);
  }

  @Roles('USER')
  @UseGuards(RolesGuard)
  @Get('orders')
  async getOrdersUser() {
    return 'orders';
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get('all')
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }
}
