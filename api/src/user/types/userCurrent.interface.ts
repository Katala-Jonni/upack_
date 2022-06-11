import { UserType } from '@app/user/types/user.type';

export interface UserCurrentInterface {
  user: UserType & { token?: string };
}
