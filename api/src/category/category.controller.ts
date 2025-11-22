import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from '@app/category/category.service';
import { CreateCategoryDto } from '@app/category/dto/createCategory.dto';
import { UpdateCategoryDto } from '@app/category/dto/updateCategory.dto';
import { CategoriesResponseInterface } from '@app/category/types/categoriesResponse.interface';
import { CategoryResponseInterface } from '@app/category/types/categoryResponse.interface';
import { JwtAuthGuard } from '@app/auth/guards/jwt-auth.guard';
import { Roles } from '@app/common/metadata/roles.metadata';
import { RolesEnum } from '@app/common/enum/roles.emum';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {
  }

  @Get('categories')
  async findAllCategory(): Promise<CategoriesResponseInterface> {
    const categories = await this.categoryService.findAllCategory();
    return this.categoryService.buildCategoriesResponse(categories);
  }

  @Get('categories/root')
  async findRootCategory(): Promise<CategoriesResponseInterface> {
    console.log('findRootCategoryfindRootCategoryfindRootCategory')
    const categories = await this.categoryService.findRootCategory();
    return this.categoryService.buildCategoriesResponse(categories);
  }

  @Get('categories/:slug')
  async findAllParentCategory(
      @Param('slug') slug: string,
      // 7f2ea932-591f-11ed-85c9-fa163e5d098a
  ): Promise<CategoriesResponseInterface> {
    const parrent = await this.categoryService.findOneCategory(slug);
    const categories = await this.categoryService.findAllParentCategory(parrent.refKey);
    return this.categoryService.buildCategoriesResponse(categories, parrent);
  }

  @Get('category/:refKey')
  async findOneCategory(
    @Param('refKey') refKey: string,
  ): Promise<CategoryResponseInterface> {
    console.log('refKey', refKey)
    const category = await this.categoryService.findOneCategory(refKey);
    return this.categoryService.buildCategoryResponse(category);
  }

  // @Post('category')
  // @UseGuards(JwtAuthGuard)
  // @Roles(RolesEnum.admin)
  // @UsePipes(new ValidationPipe())
  // async createCategory(
  //   @Body('category') createCategoryDto: CreateCategoryDto,
  // ): Promise<CategoriesResponseInterface> {
  //   const categories = await this.categoryService.createCategory(createCategoryDto);
  //   return this.categoryService.buildCategoriesResponse(categories);
  // }
  //
  // @Put('category/:slug')
  // @UseGuards(JwtAuthGuard)
  // @Roles(RolesEnum.admin)
  // @UsePipes(new ValidationPipe())
  // async updateCategory(
  //   @Param('slug') slug: string,
  //   @Body('category') updateCategoryDto: UpdateCategoryDto,
  // ): Promise<CategoryResponseInterface> {
  //   const category = await this.categoryService.updateCategory(updateCategoryDto, slug);
  //   return this.categoryService.buildCategoryResponse(category);
  // }
  //
  // @Delete('category/:slug')
  // @UseGuards(JwtAuthGuard)
  // @Roles(RolesEnum.admin)
  // async deleteCategory(
  //   @Param('slug') slug: string,
  // ): Promise<CategoriesResponseInterface> {
  //   const categories = await this.categoryService.deleteCategory(slug);
  //   return this.categoryService.buildCategoriesResponse(categories);
  // }
}
