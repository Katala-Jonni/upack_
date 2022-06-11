import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserNestSchema, User as UserSchema } from '@app/user/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '@app/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: UserNestSchema },
    ]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
