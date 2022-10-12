import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/roles/entities/role.entity';
import { RolesModule } from 'src/roles/roles.module';
import { Shop } from 'src/shop/entities/shop.entity';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Roles, Shop]),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_PRIVATE_KEY'),
        signOptions: {
          expiresIn: config.get<string | number>('JWT_EXPIRESIN'),
        },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
