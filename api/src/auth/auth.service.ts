import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '@app/user/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '@app/user/types/user.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserType> {
    const user = await this.UserModel.findOne({ email })
      .select({ __v: 0 })
      .lean()
      .exec();
    const errorResponse = {
      errors: { 'email or password': 'is invalid' },
    };
    if (!user) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const match = await compare(pass, user.password);
    if (!match) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    delete user.password;
    return user;
  }

  login(user: UserType): string {
    const payload = { id: user._id };
    return this.jwtService.sign(payload);
  }

  findById(id: string): Promise<UserType> {
    return this.UserModel.findById(id).select({ __v: 0 }).lean().exec();
  }
}
