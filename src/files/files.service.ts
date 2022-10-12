import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShopFilesDto } from './dto/create-shop-files.dto';
import { FilesShop } from './entities/file-shop.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FilesShop)
    private filesRepository: Repository<FilesShop>,
  ) {}

  async createShopFile(fileData: CreateShopFilesDto) {
    return this.filesRepository.save(fileData);
  }
}
