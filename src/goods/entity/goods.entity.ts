import { FilesGood } from 'src/files/entities/file-goods.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('goods')
export class Goods extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  descripion: string;

  @Column()
  price: number;

  @OneToMany(() => FilesGood, (files) => files.good)
  files: FilesGood[];

  @ManyToOne(() => Shop, (shop) => shop.goods)
  shop: Shop[];
}
