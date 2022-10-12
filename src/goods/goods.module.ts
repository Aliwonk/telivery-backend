import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesGood } from 'src/files/entities/file-goods.entity';
import { FilesModule } from 'src/files/files.module';
import { Goods } from './entity/goods.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { RolesModule } from 'src/roles/roles.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Goods, FilesGood, Shop]),
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
    FilesModule,
    RolesModule,
  ],
  providers: [GoodsService],
  controllers: [GoodsController],
})
export class GoodsModule {}
