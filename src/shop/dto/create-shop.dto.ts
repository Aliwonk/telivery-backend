import { User } from 'src/users/entities/user.entity';

export class CreateShopDto {
  name: string;
  description: string;
  files: Array<Express.Multer.File>;
  adress: string;
  phone: string;
  worktime: string;
  owner: User;
}
