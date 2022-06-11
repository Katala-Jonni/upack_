import { useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { Avatar, Box, Chip, Container, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { CustomerEditForm } from '../../../components/dashboard/customer/customer-edit-form';
import { gtm } from '../../../lib/gtm';
import { getInitials } from '../../../utils/get-initials';
import { CustomerAddForm } from '../../../components/dashboard/customer/customer-add-form';

const CustomerEdit = () => {

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>
          Dashboard: Customer Edit | Material Kit Pro
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: 'background.default',
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 4 }}>
            <NextLink
              href="/dashboard/customers"
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
                  Пользователи
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <Box mt={3}>
            <CustomerAddForm/>
          </Box>
        </Container>
      </Box>
    </>
  );
};

CustomerEdit.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default CustomerEdit;
