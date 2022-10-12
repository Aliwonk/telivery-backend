import { Goods } from 'src/goods/entity/goods.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('files_good')
export class FilesGood extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Goods, (good) => good.files)
  good: Goods;
}
