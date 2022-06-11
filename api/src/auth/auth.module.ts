import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from '@app/auth/strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { User as UserSchema, UserNestSchema } from '@app/user/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@app/auth/strategy/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchema.name, schema: UserNestSchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '4 Weeks',
      },
    }),
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
