import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UserService } from '@app/user/user.service';
import { verify } from 'jsonwebtoken';
import { ExpressRequestInterface } from '@app/types/expressRequest.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];
    try {
      const decodeToken = verify(token, process.env.JWT_SECRET);
      const user = await this.userService.findById(decodeToken['id']);
      req.user = user;
      next();
    } catch (e) {
      req.user = null;
      next();
    }
  }
}
