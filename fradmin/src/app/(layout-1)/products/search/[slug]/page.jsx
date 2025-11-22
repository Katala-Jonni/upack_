// PAGE VIEW COMPONENT
import { ProductSearchPageView } from 'pages-sections/product-details/page-view';
import api from '../../../../../utils/__api__/grocery-2';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Product Search - Bazaar Next.js E-commerce Template',
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: 'UI-LIB',
    url: 'https://ui-lib.com'
  }],
  keywords: ['e-commerce', 'e-commerce template', 'next.js', 'react']
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
