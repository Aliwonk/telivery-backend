import { Shop } from 'src/shop/entities/shop.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('files_shop')
export class FilesShop extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  path: string;

  @ManyToOne(() => Shop, (shop) => shop.files)
  shop: Shop;
}
