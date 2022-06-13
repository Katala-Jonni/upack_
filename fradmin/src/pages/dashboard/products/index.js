import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { productApi } from '../../../__fake-api__/product-api';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { ProjectListFilters } from '../../../components/dashboard/product/product-list-filters';
import { ProductListTable } from '../../../components/dashboard/product/product-list-table';
import { useMounted } from '../../../hooks/use-mounted';
import { Download as DownloadIcon } from '../../../icons/download';
import { Upload as UploadIcon } from '../../../icons/upload';
import { Plus as PlusIcon } from '../../../icons/plus';
import { gtm } from '../../../lib/gtm';
import { useAction } from '../../../hooks/use-actions';
import { useSelector } from 'react-redux';
import { routes } from '../../../api/routes';

const applyFilters = (products, filters) => products.filter((product) => {
  // if (filters.name) {
  //   const nameMatched = product.name.toLowerCase().includes(filters.name.toLowerCase());
  //
  //   if (!nameMatched) {
  //     return false;
  //   }
  // }

  if (filters.name) {
    const nameMatched = product.title.toLowerCase().includes(filters.name.toLowerCase());

    if (!nameMatched) {
      return false;
    }
  }

  // It is possible to select multiple category options
  if (filters.category?.length > 0) {
    const categoryMatched = filters.category.includes(product.category);

    if (!categoryMatched) {
      return false;
    }
  }

  // It is possible to select multiple status options
  // if (filters.status?.length > 0) {
  //   const statusMatched = filters.status.includes(product.status);
  //
  //   if (!statusMatched) {
  //     return false;
  //   }
  // }

  if (filters.status?.length > 0) {
    const statusMatched = filters.status.includes(product.active);

    if (!statusMatched) {
      return false;
    }
  }

  // Present only if filter required
  // if (typeof filters.inStock !== 'undefined') {
  //   const stockMatched = product.inStock === filters.inStock;
  //
  //   if (!stockMatched) {
  //     return false;
  //   }
  // }

  return true;
});

const applyPagination = (products, page, rowsPerPage) => products.slice(page * rowsPerPage,
  page * rowsPerPage + rowsPerPage);

const ProductList = () => {
  const isMounted = useMounted();
  const [products, setProducts] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    name: undefined,
    category: [],
    status: [],
    inStock: undefined
  });
  const addBtnUrl = `${routes.dashboard}${routes.products}${routes.new}`;

  const { loadProduct } = useAction();
  const { items } = useSelector(({ product }) => product);
  const { items: categories, options } = useSelector(({ category }) => category);
  // console.log('categories', categories);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  // const getProducts = useCallback(async () => {
  //   try {
  //     const data = await productApi.getProducts();
  //
  //     if (isMounted()) {
  //       setProducts(data);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [isMounted]);

  useEffect(() => {
      loadProduct();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  useEffect(() => {
      setProducts(items);
      setCategoryOptions(options || []);
      // getProducts();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items, options]);

  if (!products) {
    return false;
  }

  const handleFiltersChange = (filters) => {
    setFilters(filters);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredProducts = applyFilters(products, filters);
  const paginatedProducts = applyPagination(filteredProducts, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>
          Товары
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  Товары
                </Typography>
              </Grid>
              <Grid item>
                <NextLink
                  href={addBtnUrl}
                  passHref
                >
                  <Button
                    component="a"
                    startIcon={<PlusIcon fontSize="small"/>}
                    variant="contained"
                  >
                    Добавить
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
          <Card>
            {/*<ProjectListFilters onChange={handleFiltersChange}/>*/}
            <ProductListTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              products={paginatedProducts}
              productsCount={filteredProducts.length}
              rowsPerPage={rowsPerPage}
              options={categoryOptions}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

ProductList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default ProductList;
