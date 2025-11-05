'use client';

import { useCallback, useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
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
import api from '../../../utils/__api__/grocery-2';
import StickyWrapper from '../../../components/sticky-wrapper';
import Section3 from '../../grocery-2/section-3/section-3';

const SORT_OPTIONS = [
  {
    label: 'По умолчанию',
    value: 'Relevance'
  },
  // {
  //   label: 'Date',
  //   value: 'Date'
  // },
  {
    label: 'Дешевле',
    value: 'Price Low to High'
  }, {
    label: 'Дороже',
    value: 'Price High to Low'
  }
];
export default function ProductSearchPageView(props) {
  const categories = props.categories;
  const [view, setView] = useState('grid');
  const downMd = useMediaQuery(theme => theme.breakpoints.down('md'));
  const toggleView = useCallback(v => () => setView(v), []);
  const PRODUCTS = productDatabase.slice(95, 104);
  // const navigationList = await api.getNavigationList();
  // const SideNav = <GrocerySideNav navigation={navigationList} />;
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
        <H5>Наименование категории</H5>
        {categories.length ? null : <Paragraph color="grey.600">{props.countCollection || 0} товаров</Paragraph>}
      </div>

      {categories.length
        ? null
        : <FlexBox alignItems="center" columnGap={4} flexWrap="wrap" my="0.5rem">

          <FlexBox alignItems="center" gap={1} flex="1 1 0">
            <Paragraph color="grey.600" whiteSpace="pre">
              Фильтры:
            </Paragraph>

            <TextField select fullWidth size="small" variant="outlined" placeholder="Short by"
                       defaultValue={SORT_OPTIONS[0].value} sx={{
              flex: '1 1 0',
              minWidth: '150px'
            }}>
              {SORT_OPTIONS.map(item => <MenuItem value={item.value} key={item.value}>
                {item.label}
              </MenuItem>)}
            </TextField>
          </FlexBox>

          <FlexBox alignItems="center" my="0.25rem">
            <Paragraph color="grey.600" mr={1}>
              Вид:
            </Paragraph>

            <IconButton onClick={toggleView('grid')}>
              <Apps color={view === 'grid' ? 'primary' : 'inherit'} fontSize="small"/>
            </IconButton>

            <IconButton onClick={toggleView('list')}>
              <ViewList color={view === 'list' ? 'primary' : 'inherit'} fontSize="small"/>
            </IconButton>

            {
              /* SHOW IN THE SMALL DEVICE */
            }
            {/*{downMd && <Sidenav handler={close => <IconButton onClick={close}>*/}
            {/*  <FilterList fontSize="small"/>*/}
            {/*</IconButton>}>*/}
            {/*  <ProductFilterCard/>*/}
            {/*</Sidenav>}*/}
          </FlexBox>
        </FlexBox>
      }


    </Card>

    {categories.length
      ? <Section3 categories={categories}/>
      : <Grid item md={12} xs={12}>
        {view === 'grid' ? <ProductsGridView products={props.products} slug={props.slug} countCollection={props.countCollection}/> : <ProductsListView products={props.products} slug={props.slug} countCollection={props.countCollection}/>}
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
