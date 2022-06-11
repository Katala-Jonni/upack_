import React, { useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Container, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { ProductCreateForm } from '../../../../components/dashboard/product/product-create-form';
import { gtm } from '../../../../lib/gtm';
import { ProductEditForm } from '../../../../components/dashboard/product/product-edit-form';

const ProductCreate = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
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
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">
              Изменить (Указать название товара)
            </Typography>
          </Box>
          <ProductEditForm/>
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
