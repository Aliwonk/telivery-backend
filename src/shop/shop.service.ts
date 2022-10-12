import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateShopDto } from './dto/create-shop.dto';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: Repository<Shop>,
    private usersService: UsersService,
  ) {}

  async createShop(storeData: CreateShopDto) {
    return this.shopRepository.save(storeData);
  }

  async getShopByName(name: string) {
    return await this.shopRepository.findOne({ where: { name } });
  }
}
