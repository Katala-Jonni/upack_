import { Module } from '@nestjs/common';
import { DatabaseService } from '@app/database/database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri:
          process.env.NODE_ENV === 'test'
            ? process.env.MONGODB_CONNECTION_STRING_TEST
            : process.env.MONGODB_CONNECTION_STRING,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
