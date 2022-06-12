import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserService } from '@app/user/user.service';
import { LoginUserDto } from '@app/user/dto/loginUser.dto';
import { LocalAuthGuard } from '@app/auth/guards/local-auth.guard';
import { Roles } from '@app/common/metadata/roles.metadata';
import { AuthService } from '@app/auth/auth.service';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { User } from '@app/user/decorators/user.decorator';
import { UserType } from '@app/user/types/user.type';
import { UserCurrentInterface } from '@app/user/types/userCurrent.interface';
import { UpdateUserDto } from '@app/user/dto/updateUser.dto';
import { RolesEnum } from '@app/common/enum/roles.emum';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.admin)
  // @Roles(RolesEnum.user)
  async getCurrentUser(@User() user: UserType): Promise<UserCurrentInterface> {
    return this.userService.buildCurrentUserResponse(user);
  }

  @Post('users')
  @UsePipes(new ValidationPipe())
  // @UseGuards(JwtAuthGuard)
  // @Roles(RolesEnum.user, RolesEnum.admin)
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
    @User('id') currentUserId: string,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe())
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Req() req,
  ): Promise<UserCurrentInterface> {
    const token = this.authService.login(req.user);
    return this.userService.buildCurrentUserResponse(req.user, token);
  }

  @Put('user')
  @UseGuards(JwtAuthGuard)
  @Roles(RolesEnum.user)
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Body('user') updateUserDto: UpdateUserDto,
    @User('id') currentUserId: string,
  ): Promise<UserCurrentInterface> {
    const user = await this.userService.updateUser(
      updateUserDto,
      currentUserId,
    );
    return this.userService.buildCurrentUserResponse(user);
  }
}
