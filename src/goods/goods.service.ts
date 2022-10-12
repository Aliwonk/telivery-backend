import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';
import { CreateGoodDto } from './dto/create-good.dto';
import { Goods } from './entity/goods.entity';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods)
    private goodsRepository: Repository<Goods>,
    private filesService: FilesService,
  ) {}
  async createGood(goodData: CreateGoodDto) {}
}
