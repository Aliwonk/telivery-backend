import { User } from 'src/users/entities/user.entity';

export class CreateRoleDto {
  value: string;
  user: User;
}
