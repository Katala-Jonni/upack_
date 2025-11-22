import { Fragment, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination'; // GLOBAL CUSTOM COMPONENTS

import { Span } from 'components/Typography';
import { FlexBetween } from 'components/flex-box';
import ProductCard1 from 'components/product-cards/product-card-1';
import ProductCard2 from '../product-cards/product-card-2/product-card';
import { ProductCard3 } from '../product-cards/product-card-3';
import ProductCard4 from '../product-cards/product-card-4/product-card';
import ProductCard8 from '../product-cards/product-card-8';
import api, { viewProductsCategoryDataBae } from '../../utils/__api__/grocery-2';
import Loading from '../../app/loading'; // CUSTOM DATA MODEL

// ========================================================

export default function ProductsGridView({
                                           products,
                                           countCollection,
                                           sortValue,
                                           setPage,
                                           page,
                                           handleChangeSortFilterProducts,
                                           setLoad,
                                           load,
                                           ...props
                                         }) {
  const [prod, setProd] = useState([]);
  // const [load, setLoad] = useState(false);

  // useEffect(() => {
  //   setProd(products);
  //   // return () => {
  //   //   setPage(1);
  //   // };
  // }, [products]);

  const onChange = async (event, page) => {
    try {
      await setLoad(true);
      window.scrollTo(0, 0);
      await handleChangeSortFilterProducts(page);
      // const path = `/api/products/${prod[0].parent}?page=${page}&sort=${sortValue}`;
      // const searchPath = `/api/products/search?title=${props.searchTitle}&page=${page}&sort=${sortValue}`;
      //searchTitle
      // const response = await fetch(props.searchTitle ? searchPath : path);
      // const result = await response.json();
      // const newProducts = viewProductsCategoryDataBae(result.products);
      // setProd(newProducts);
      // setPage(page);
      setLoad(false);
      // await setLoad(true);
      // window.scrollTo(0, 0);
      // const path = `/api/products/${prod[0].parent}?page=${page}&sort=${sortValue}`;
      // const searchPath = `/api/products/search?title=${props.searchTitle}&page=${page}&sort=${sortValue}`;
      // //searchTitle
      // const response = await fetch(props.searchTitle ? searchPath : path);
      // const result = await response.json();
      // const newProducts = viewProductsCategoryDataBae(result.products);
      // setProd(newProducts);
      // setPage(page);
      // setLoad(false);
    } catch (e) {
      console.log('Ошибка в запросе onChange в компоненте product-grid-view', e);
    }

  };

  return <Fragment>
    {load
      ? <Loading/>
      : <Grid container spacing={3}>
        {products.map(item => <Grid item lg={3} md={3} sm={6} xs={6} key={item.id}>
          <ProductCard1 id={item.id} slug={item.slug} title={item.title} price={item.price} rating={item.rating}
                        imgUrl={item.thumbnail} discount={item.discount} comment={item.comment} count={item.count}/>
        </Grid>)}
      </Grid>
    }

    <FlexBetween flexWrap="wrap" mt={4}>
      <Span color="grey.600">{`Просмотрите все товары, используйте постраничную навигацию`}</Span>
      <Pagination page={page} count={Math.ceil(countCollection / 8)} variant="outlined" color="primary"
                  onChange={(onChange)}/>
    </FlexBetween>
  </Fragment>;

}
