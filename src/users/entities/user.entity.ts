import { Roles } from 'src/roles/entities/role.entity';
import { Shop } from 'src/shop/entities/shop.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  BaseEntity,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true, default: null })
  lastName: string;

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text', nullable: true, default: null })
  patronymic: string;

  @Column({
    type: 'varchar',
    length: 250,
    unique: true,
    nullable: true,
    default: null,
  })
  email: string;

  @Column({ type: 'varchar', length: 14, unique: true })
  phone: string;

  @Column({ type: 'varchar', length: 250 })
  password: string;

  @Column({ type: 'int', nullable: true, default: null })
  countCashBack: number;

  @Column({ type: 'int', nullable: true, default: null })
  card: number;

  @Column({ type: 'varchar', nullable: true, default: null })
  address: string;

  @Column({ type: 'date', nullable: true, default: null })
  dateofbirth: Date;

  @ManyToMany(() => Shop, (shop) => shop.clients)
  clientstore: Shop[];

  @OneToMany(() => Shop, (shops) => shops.owner)
  ownershops: Shop[];

  @OneToMany(() => Roles, (roles) => roles.user)
  roles: Roles[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
}
