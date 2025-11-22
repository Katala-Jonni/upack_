'use client';

import { useCallback, useEffect, useState, Fragment } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery'; // MUI ICON COMPONENTS

import Apps from '@mui/icons-material/Apps';
import ViewList from '@mui/icons-material/ViewList';
import FilterList from '@mui/icons-material/FilterList'; // Local CUSTOM COMPONENT

import ProductFilterCard from '../product-filter-card'; // GLOBAL CUSTOM COMPONENTS

import FlexBox from 'components/flex-box/flex-box';
import Sidenav from 'components/side-nav/side-nav';
import { H5, Paragraph } from 'components/Typography';
import ProductsGridView from 'components/products-view/products-grid-view';
import ProductsListView from 'components/products-view/products-list-view'; // PRODUCT DATA

import productDatabase from 'data/product-database';
import GrocerySideNav from '../../../components/page-sidenav/grocery-side-nav';
import api, { viewProductsCategoryDataBae } from '../../../utils/__api__/grocery-2';
import StickyWrapper from '../../../components/sticky-wrapper';
import Section3 from '../../grocery-2/section-3/section-3';
import useCategories from '../../../hooks/useCategories';
import logo from '../../../components/footer/components/logo';

const SORT_OPTIONS = [
  {
    label: 'По умолчанию',
    value: 'relevance'
  },
  {
    label: 'Дешевле',
    value: 'low'
  }, {
    label: 'Дороже',
    value: 'high'
  }
];

const getSortItems = (arr = [], prop) => {
  let items = [...arr];
  if (prop === 'high') {
    items = [...arr].sort((a, b) => b.price - a.price);
  } else if (prop.value === 'low') {
    items = [...arr].sort((a, b) => a.price - b.price);
  }
  return items;
};

export default function ProductSearchPageView(props) {
  const categories = props.categories;
  const parentCategory = props.parentCategory;
  const [view, setView] = useState('grid');
  const downMd = useMediaQuery(theme => theme.breakpoints.down('md'));
  const toggleView = useCallback(v => () => setView(v), []);
  const PRODUCTS = productDatabase.slice(95, 104);
  const linkToParent = parentCategory?.parent === '00000000-0000-0000-0000-000000000000';
  // const linkToParent = parentCategory.parent === '00000000-0000-0000-0000-000000000000' ? parentCategory.title : <Link href={`/products/search/${parentCategory.refKey}`}>parentCategory.title</Link>
  // const navigationList = await api.getNavigationList();
  // const SideNav = <GrocerySideNav navigation={navigationList} />;
  const [products, setProducts] = useState([]);
  const [countCollection, setCountCollection] = useState(0);
  const [searchTitle, setSearchTitle] = useState('');
  const [sortValue, setSortValue] = useState(SORT_OPTIONS[0].value);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    // setProducts(getSortItems(props.products, sortValue));
    setProducts(props.products);
    setCountCollection(props.countCollection);
    setSearchTitle(props.searchTitle);
  }, [props.products]);

  const handleChangeSortFilterProducts = async (page_ = 1, valueSort, isSort = false) => {
    try {
      const newPage = isSort ? 1 : page_;
      await setLoad(true);
      const path = `/api/products/${products[0].parent}?page=${newPage}&sort=${valueSort || sortValue}`;
      const searchPath = `/api/products/search?title=${searchTitle}&page=${newPage}&sort=${valueSort || sortValue}`;
      //searchTitle
      const response = await fetch(searchTitle ? searchPath : path);
      const result = await response.json();
      const newProducts = viewProductsCategoryDataBae(result.products);
      setProducts(newProducts);
      setPage(newPage);
      setLoad(false);
    } catch (e) {
      console.log('Ошибка в запросе onChange в компоненте product-grid-view', e);
    }

  };

  const handleChangeSort = async e => {
    e.preventDefault();
    // const items = getSortItems(props.products, e.target.value);
    // setProducts(items);
    setSortValue(e.target.value);
    await handleChangeSortFilterProducts(page, e.target.value, true);
  };

  return <Container className="mt-2 mb-3">
    {
      /* FILTER ACTION AREA */
    }
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
      <div>
        {props.searchTitle && <H5>Вот, что мы нашли по запросу: {props.searchTitle}</H5>}
        {parentCategory?.title && <H5>{parentCategory.title}</H5>}
        {/*<H5>{props.searchTitle ? `Вот, что мы нашли по запросу: ${props.searchTitle}` : `Наименование категории ${parentCategory.title}`}</H5>*/}
        {categories?.length ? <Paragraph color="grey.600">Выберите раздел</Paragraph> :
          <Paragraph color="grey.600">{countCollection || 0} товаров</Paragraph>}
        {/*<Paragraph color="grey.600">{!categories?.length ? 'Выберите раздел' : count}</Paragraph>*/}
      </div>

      {/*{setSearchTitle*/}
      {/*  ? null*/}
      {/*:*/}

      {/*}*/}
      {products?.length
        ? <Fragment>
          <FlexBox alignItems="center" columnGap={4} flexWrap="wrap" my="0.5rem">
            <FlexBox alignItems="center" gap={1} flex="1 1 0">
              <Paragraph color="grey.600" whiteSpace="pre">
                На сайте указаны базовые цены, не является афертой.
              </Paragraph>
            </FlexBox>
          </FlexBox>
          <FlexBox alignItems="center" columnGap={4} flexWrap="wrap" my="0.5rem">

            <FlexBox alignItems="center" gap={1} flex="1 1 0">
              <Paragraph color="grey.600" whiteSpace="pre">
                Фильтры:
              </Paragraph>

              <TextField onChange={handleChangeSort} select fullWidth size="small" variant="outlined"
                         placeholder="Short by"
                         value={sortValue} sx={{
                flex: '1 1 0',
                minWidth: '150px'
              }}>
                {SORT_OPTIONS.map(item => <MenuItem value={item.value} key={item.value}>
                  {item.label}
                </MenuItem>)}
              </TextField>
            </FlexBox>

            <FlexBox alignItems="center" my="0.25rem">
              {/*<Paragraph color="grey.600" mr={1}>*/}
              {/*  Вид:*/}
              {/*</Paragraph>*/}

              {/*<IconButton onClick={toggleView('grid')}>*/}
              {/*  <Apps color={view === 'grid' ? 'primary' : 'inherit'} fontSize="small"/>*/}
              {/*</IconButton>*/}

              {/*<IconButton onClick={toggleView('list')}>*/}
              {/*  <ViewList color={view === 'list' ? 'primary' : 'inherit'} fontSize="small"/>*/}
              {/*</IconButton>*/}

              {
                // /* SHOW IN THE SMALL DEVICE */
              }
              {/*{downMd && <Sidenav handler={close => <IconButton onClick={close}>*/}
              {/*  <FilterList fontSize="small"/>*/}
              {/*</IconButton>}>*/}
              {/*  <ProductFilterCard/>*/}
              {/*</Sidenav>}*/}
            </FlexBox>
          </FlexBox>
        </Fragment>
        : null
      }


      {/*}*/}


    </Card>

    {categories?.length
      ? <Section3 categories={categories}/>
      : <Grid item md={12} xs={12}>
        {view === 'grid' ?
          <ProductsGridView page={page}
                            setPage={setPage}
                            load={load}
                            setLoad={setLoad}
                            sortValue={sortValue}
                            products={products}
                            slug={props.slug}
                            countCollection={countCollection}
                            searchTitle={searchTitle}
                            handleChangeSortFilterProducts={handleChangeSortFilterProducts}/> :
          <ProductsListView products={products} slug={props.slug} countCollection={countCollection}
                            searchTitle={searchTitle}/>}
        {/*{view === 'grid' ? <ProductsGridView products={PRODUCTS} slug={props.slug}/> : <ProductsListView products={PRODUCTS} slug={props.slug}/>}*/}
      </Grid>
    }

    {/*<StickyWrapper SideNav={SideNav}>*/}
    <Grid container spacing={3}>
      {
        /* PRODUCT FILTER SIDEBAR AREA */
      }
      {/*<Grid item md={3} sx={{*/}
      {/*  display: {*/}
      {/*    md: 'block',*/}
      {/*    xs: 'none'*/}
      {/*  }*/}
      {/*}}>*/}
      {/*  <ProductFilterCard/>*/}
      {/*</Grid>*/}

      {
        /* PRODUCT VIEW AREA */
      }
      {/*<Grid item md={12} xs={12}>*/}
      {/*  {view === 'grid' ? <ProductsGridView products={PRODUCTS}/> : <ProductsListView products={PRODUCTS}/>}*/}
      {/*</Grid>*/}
    </Grid>
    {/*</StickyWrapper>*/}
  </Container>;
}
