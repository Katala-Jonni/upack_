import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { User, UserDocument } from '@app/user/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { hash } from 'bcrypt';
import { UserType } from '@app/user/types/user.type';
import { UserCurrentInterface } from '@app/user/types/userCurrent.interface';
import { UpdateUserDto } from '@app/user/dto/updateUser.dto';
import { CreateUserWithAdminDto } from '@app/user/dto/createUserWithAdmin.dto';
import { CreateUserPayloadInterface } from '@app/user/types/createUserPayload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // await this.UserModel.deleteMany();
    const errorResponse = {
      errors: {},
    };
    const userByEmail =
      createUserDto.email &&
      (await this.UserModel.findOne({
        email: createUserDto.email,
      }));

    const userByPhone =
      createUserDto.phone &&
      (await this.UserModel.findOne({
        phone: createUserDto.phone,
      }));

    if (userByEmail) {
      errorResponse.errors['email'] = 'has already been taken';
    }

    if (userByPhone) {
      errorResponse.errors['phone'] = 'has already been taken';
    }

    if (userByEmail || userByPhone) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    createUserDto.password = await this.createPassword(createUserDto.password);
    const payload = this.createPayload(createUserDto);

    const newUser = new this.UserModel(payload);
    await newUser.save();
    return await this.findOne(payload.email);
  }

  async findOne(prop: string): Promise<User | undefined> {
    return await this.UserModel.findOne({ prop })
      .select({
        __v: 0,
        password: 0,
        createdAt: 0,
        roles: 0,
        phone: 0,
        email: 0,
      })
      .lean()
      .exec();
  }

  async findById(id: string): Promise<UserDocument> {
    return await this.UserModel.findById(id).select({ __v: 0 }).exec();
  }

  async update(
    updateUserDto: UpdateUserDto,
    currentUserId: string,
  ): Promise<UserType> {
    return await this.UserModel.findByIdAndUpdate(
      currentUserId,
      updateUserDto,
      { new: true },
    )
      .select({
        __v: 0,
        password: 0,
        createdAt: 0,
        _id: 0,
      })
      .lean()
      .exec();
  }

  async updateUser(
    updateUserDto: UpdateUserDto,
    currentUserId: string,
  ): Promise<UserType> {
    const currentUser = await this.findById(currentUserId);
    if (!currentUser) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    const errorResponse = {
      errors: {},
    };
    const userByEmail =
      updateUserDto.email &&
      (await this.UserModel.findOne({
        email: updateUserDto.email,
      }));

    const userByPhone =
      updateUserDto.phone &&
      (await this.UserModel.findOne({
        phone: updateUserDto.phone,
      }));

    const isEmail = userByEmail && userByEmail.email !== currentUser.email;
    const isPhone = userByPhone && userByPhone.phone !== currentUser.phone;

    if (isEmail) {
      errorResponse.errors['email'] = 'has already been taken';
    }

    if (isPhone) {
      errorResponse.errors['phone'] = 'has already been taken';
    }

    if (isEmail || isPhone) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    updateUserDto.password = await this.createPassword(updateUserDto.password);
    return await this.update(updateUserDto, currentUserId);
  }

  async createPassword(pass: string): Promise<string> {
    return await hash(pass, 10);
  }

  createPayload(
    createUserDto: CreateUserDto | CreateUserWithAdminDto,
  ): CreateUserPayloadInterface {
    return {
      email: createUserDto.email,
      name: createUserDto.name,
      surname: createUserDto.surname,
      secondName: createUserDto.secondName,
      password: createUserDto.password,
      phone: createUserDto.phone,
    };
  }

  buildUserResponse(userSchema: User): UserResponseInterface {
    return { user: userSchema };
  }

  buildCurrentUserResponse(
    userSchema: UserType,
    token: string | null = null,
  ): UserCurrentInterface {
    let user = { ...userSchema };
    delete user.roles;
    if (token) {
      user = Object.assign(user, { token });
    }
    return { user };
  }
}
