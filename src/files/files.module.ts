import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goods } from 'src/goods/entity/goods.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import { FilesShop } from './entities/file-shop.entity';
import { FilesService } from './files.service';

@Module({
  imports: [TypeOrmModule.forFeature([FilesShop, Shop, Goods])],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
