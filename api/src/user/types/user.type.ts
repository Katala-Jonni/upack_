import { User } from '@app/user/user.schema';
import { RolesEnum } from '@app/common/enum/roles.emum';

export type UserType = User & { _id: string; password?: string };
export type RolesType = RolesEnum.user | RolesEnum.admin;
