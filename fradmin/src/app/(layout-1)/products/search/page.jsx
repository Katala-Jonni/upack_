// PAGE VIEW COMPONENT
import { ProductSearchPageView } from 'pages-sections/product-details/page-view';
import { notFound } from 'next/navigation';
import api from '../../../../utils/__api__/grocery-2';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';

export const metadata = {
  title: 'Product Search - Bazaar Next.js E-commerce Template',
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: 'UI-LIB',
    url: 'https://ui-lib.com'
  }],
  keywords: ['e-commerce', 'e-commerce template', 'next.js', 'react']
};
export default async function ProductSearch({ searchParams }) {
  console.log('ProductSearchSearchParams', searchParams);
  try {
    const { products, countCollection } = await api.getSearchProducts(searchParams?.title, searchParams?.page);
    if (products?.length) {
      return <ProductSearchPageView categories={[]} slug={'search'} products={products}
                                    countCollection={countCollection} searchTitle={searchParams.title}/>;
    }
    return <Container className="mt-2 mb-3">
      <Card elevation={1} sx={{
        mb: '55px',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: {
          sm: '1rem 1.25rem',
          md: '0.5rem 1.25rem',
          xs: '1.25rem 1.25rem 0.25rem'
        }
      }}>
        <H5>{'По Вашему запросу ничего не найдено, скорректируйте запрос или введите другой'}</H5>
      </Card>
    </Container>;
  } catch (error) {
    console.log('error', error);
    notFound();
  }
}
