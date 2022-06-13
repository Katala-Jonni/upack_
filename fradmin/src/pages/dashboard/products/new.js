import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Container, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { ProductCreateForm } from '../../../components/dashboard/product/product-create-form';
import { gtm } from '../../../lib/gtm';
import { routes } from '../../../api/routes';
import { useAction } from '../../../hooks/use-actions';
import { useSelector } from 'react-redux';

const ProductCreate = () => {
  const url = `${routes.dashboard}${routes.products}`;
  // const [categoryOptions, setCategoryOptions] = useState([]);
  // const { loadCategory } = useAction();
  // const { options } = useSelector(({ category }) => category);
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  // useEffect(() => {
  //   loadCategory();
  // }, []);
  //
  // useEffect(() => {
  //     setCategoryOptions(options || []);
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [options]);

  return (
    <>
      <Head>
        <title>
          Добавить новый продукт
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink
              href={url}
              passHref
            >
              <Link
                color="textPrimary"
                component="a"
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <ArrowBackIcon
                  fontSize="small"
                  sx={{ mr: 1 }}
                />
                <Typography variant="subtitle2">
                  Все товары
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">
              Создать новый товар
            </Typography>
          </Box>
          <ProductCreateForm
            // categoryOptions={categoryOptions}
          />
        </Container>
      </Box>
    </>
  );
};

ProductCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default ProductCreate;
