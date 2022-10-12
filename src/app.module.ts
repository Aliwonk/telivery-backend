import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join, resolve } from 'path';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { GoodsModule } from './goods/goods.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
import { FilesModule } from './files/files.module';
import { JwtModule } from '@nestjs/jwt';

const environment = process.env.NODE_ENV || 'development';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: `.${environment}.env`,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveStaticOptions: {
        index: false,
      },
      serveRoot: '/',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('TYPEORM_HOST'),
        port: config.get<number>('TYPEORM_PORT'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        database: config.get<string>('TYPEORM_DATABASE'),
        entities: [join(__dirname, '**', '*.entity.js')],
        synchronize: true,
        logging: config.get<boolean>('TYPEORM_LOGGING'),
      }),
      inject: [ConfigService],
    }),
    // JwtModule.registerAsync({
    //   useFactory: async (config: ConfigService) => ({
    //     secret: config.get<string>('JWT_PRIVATE_KEY'),
    //     signOptions: {
    //       expiresIn: config.get<string | number>('JWT_EXPIRESIN'),
    //     },
    //   }),
    //   inject: [ConfigService],
    //   imports: [ConfigModule],
    // }),
    OrdersModule,
    GoodsModule,
    RolesModule,
    AuthModule,
    ShopModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
