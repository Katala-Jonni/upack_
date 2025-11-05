import { Module } from '@nestjs/common';
import { DatabaseService } from '@app/database/database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
          useFactory: () => ({ uri: "mongodb://mongo:27017/upack" })
        })
    ],
    providers: [DatabaseService],
    exports: [DatabaseService]
})
export class DatabaseModule {
}

// useFactory: () => ({ uri: "MONGO_URI=mongodb://mongo:27017/upack" }),
//   uri:
//     process.env.NODE_ENV === 'test'
//       ? process.env.MONGODB_CONNECTION_STRING_TEST
//       : process.env.MONGODB_CONNECTION_STRING,
// }),
// useFactory: (configService: ConfigService) => ({
//   uri: configService.get<string>(process.env.MONGODB_CONNECTION_STRING),
// }),
// inject: [ConfigService],
// inject: [ConfigService],
