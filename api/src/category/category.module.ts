import { Module } from '@nestjs/common';
import { CategoryController } from '@app/category/category.controller';
import { CategoryService } from '@app/category/category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '@app/category/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Category.name, schema: CategorySchema,
    }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})

export class CategoryModule {
}
