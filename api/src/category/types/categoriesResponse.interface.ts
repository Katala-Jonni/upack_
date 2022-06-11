import { Category } from '@app/category/category.schema';

export interface CategoriesResponseInterface {
  categories: Category[],
  categoriesCount: number
}
