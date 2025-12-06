// PAGE VIEW COMPONENT
import { ProductSearchPageView } from 'pages-sections/product-details/page-view';
import { notFound } from 'next/navigation';
import api from '../../../../utils/__api__/grocery-2';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';

export const metadata = {
  title: "ЮПАК Петрозаводск",
  description: `ЮПАК Петрозаводск Карелия - оптовые продажи для направлений медицина, бьюти сфера, общепит. Одноразовая посуда, хоз товары, пакеты, перчатки в Петрозаводске`,
  authors: [{
    name: "KJ",
    url: "https://upack-10.ru/"
  }],
  keywords: ["хоз товары", "пакеты", "перчатки", "юпак Петрозаводск"]
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
