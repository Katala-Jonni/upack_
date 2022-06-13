import React, { Fragment, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Container, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { gtm } from '../../../../lib/gtm';
import { ProductEditForm } from '../../../../components/dashboard/product/product-edit-form';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useAction } from '../../../../hooks/use-actions';

const ProductCreate = () => {
  const router = useRouter();
  const { currentProduct } = useSelector(({ product }) => product);
  const { startCurrentProduct, loadProduct } = useAction();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  useEffect(() => {
    startCurrentProduct({ slug: router.query.productId });
    loadProduct();
  }, []);

  return (
    <>
      <Head>
        <title>
          Dashboard: Product Create | Material Kit Pro
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
              href="/dashboard/products"
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
          {currentProduct
            ? <Fragment>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h4">
                  Изменить (Указать название товара)
                </Typography>
              </Box>
              <ProductEditForm
                product={currentProduct}
              />
            </Fragment>
            : <Typography variant="h6">
              Товар не найден!
            </Typography>
          }

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
