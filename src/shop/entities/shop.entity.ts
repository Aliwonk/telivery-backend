import { FilesShop } from 'src/files/entities/file-shop.entity';
import { Goods } from 'src/goods/entity/goods.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shops')
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: 'varchar', unique: true })
  adress: string;

  @Column({ type: 'varchar' })
  worktime: string;

  @ManyToMany(() => User, (users) => users.clientstore)
  clients: User[];

  @OneToMany(() => FilesShop, (files) => files.shop)
  files: FilesShop[];

  @ManyToOne(() => User, (user) => user.ownershops)
  owner: User;

  @OneToMany(() => Goods, (goods) => goods.shop)
  goods: Goods[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
