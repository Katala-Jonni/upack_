// PAGE VIEW COMPONENT
import { ProductSearchPageView } from 'pages-sections/product-details/page-view';
import api from '../../../../../utils/__api__/grocery-2';
import { notFound } from 'next/navigation';

export const metadata = {
  title: "ЮПАК Петрозаводск",
  description: `ЮПАК Петрозаводск Карелия - оптовые продажи для направлений медицина, бьюти сфера, общепит. Одноразовая посуда, хоз товары, пакеты, перчатки в Петрозаводске`,
  authors: [{
    name: "KJ",
    url: "https://upack-10.ru/"
  }],
  keywords: ["хоз товары", "пакеты", "перчатки", "юпак Петрозаводск"]
};
export default async function ProductSearch({ params }) {
  try {
    const { categories, parentCategory } = await api.getCategoriesId(params.slug);
    if (!categories.length) {
      const { products, countCollection } = await api.getCategoryProducts(params.slug);
      // console.log('categoriesProductSearch', products);
      return <ProductSearchPageView parentCategory={parentCategory} categories={categories} slug={params.slug}
                                    products={products} countCollection={countCollection}/>;
    }
    return <ProductSearchPageView parentCategory={parentCategory} categories={categories} slug={params.slug}/>;
  } catch (error) {
    notFound();
  }
}
