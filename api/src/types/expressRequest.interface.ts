import { Request } from 'express';
import { User } from '@app/user/user.schema';

export interface ExpressRequestInterface extends Request {
  user?: User;
}
