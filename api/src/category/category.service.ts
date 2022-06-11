import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
// schemas
import { Category, CategoryDocument } from '@app/category/category.schema';
// dto
import { CreateCategoryDto } from '@app/category/dto/createCategory.dto';
import { UpdateCategoryDto } from '@app/category/dto/updateCategory.dto';
// interfaces
import { CategoryResponseInterface } from '@app/category/types/categoryResponse.interface';
import { CategoriesResponseInterface } from '@app/category/types/categoriesResponse.interface';
import { SearchInterface } from '@app/category/types/search.interface';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private readonly categoryRepository: Model<CategoryDocument>) {
  }

  async findOne(query: SearchInterface): Promise<Category> {
    return await this.categoryRepository.findOne(query)
      .select({
        __v: 0,
      })
      .exec();
  }

  async findAllCategory(): Promise<Category[]> {
    return await this.categoryRepository.find()
      .select({
        __v: 0,
      })
      .exec();
  }

  async findOneCategory(slug: string): Promise<Category> {
    return this.findOne({ slug });
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category[]> {
    const categoryByTitle = await this.findOne({ title: createCategoryDto.title });
    const errorResponse = {
      errors: {},
    };
    if (categoryByTitle) {
      errorResponse['title'] = 'has already been taken';
    }

    if (categoryByTitle) {
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const slug = this.getSlug(createCategoryDto.title);
    const newCategory = new this.categoryRepository({
      ...createCategoryDto,
      slug,
    });
    await newCategory.save();
    return this.findAllCategory();
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto, slug: string): Promise<Category> {
    const categoryBySlug = await this.findOne({ slug });
    const categoryByTitle = await this.findOne({ title: updateCategoryDto.title });
    if (!categoryBySlug) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    const errorResponse = {
      errors: {},
    };
    const isCategoryBySlug = updateCategoryDto.title.toLowerCase() !== categoryBySlug.title.toLowerCase();
    if (categoryByTitle && isCategoryBySlug) {
      errorResponse['title'] = 'has already been taken';
      throw new HttpException(errorResponse, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newSlug = isCategoryBySlug ? this.getSlug(updateCategoryDto.title) : slug;
    return await this.categoryRepository.findOneAndUpdate(
      { slug },
      { ...updateCategoryDto, slug: newSlug },
      { new: true },
    ).select({
      __v: 0,
    })
      .exec();
  }

  async deleteCategory(slug: string) {
    const categoryBySlug: Category & { _id?: string } = await this.findOne({ slug });
    if (!categoryBySlug) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    if (categoryBySlug.products.length) {
      const errorMessage = 'У категории есть продукты, чтобы удалить категорию, необходимо удалить продукты или перенести все продукты в другую категорию';
      throw new HttpException(errorMessage, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    await this.categoryRepository.findByIdAndDelete(categoryBySlug._id);
    return this.findAllCategory();
  }

  private getSlug(title: string): string {
    const slug = slugify(title, {
      lower: true,
    });
    const randomString = ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
    return `${slug}-${randomString}`;
  }

  buildCategoriesResponse(categories: Category[]): CategoriesResponseInterface {
    return { categories, categoriesCount: categories.length };
  }

  buildCategoryResponse(category: Category): CategoryResponseInterface {
    return { category };
  }
}
