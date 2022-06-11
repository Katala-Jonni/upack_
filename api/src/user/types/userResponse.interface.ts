import { User } from '@app/user/user.schema';

export interface UserResponseInterface {
  user: User & { token?: string };
}
