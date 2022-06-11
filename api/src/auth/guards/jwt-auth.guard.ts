import {
  ExecutionContext,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@app/common/metadata/roles.metadata';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private roles: string[];

  constructor(private readonly reflector: Reflector) {
    super();
  }

  public canActivate(context: ExecutionContext) {
    this.roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    return super.canActivate(context);
  }

  public handleRequest(err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
    }
    if (!this.roles) {
      return user;
    }
    const isRoles: boolean = this.roles.some((role: string) =>
      user.roles?.includes(role),
    );
    if (!isRoles) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { roles, ...userWithoutRoles } = user;
    return userWithoutRoles;
  }
}
