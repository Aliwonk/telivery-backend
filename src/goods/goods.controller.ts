import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/guards/roles-auth.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateGoodDto } from './dto/create-good.dto';
import { GoodsService } from './goods.service';

@Controller('goods')
export class GoodsController {
  constructor(private goodsService: GoodsService) {}
  @Roles('OWNER')
  @UseGuards(RolesGuard)
  @Post('create')
  createGood(@Body() goodData: CreateGoodDto) {
    return this.goodsService.createGood(goodData);
  }
}
