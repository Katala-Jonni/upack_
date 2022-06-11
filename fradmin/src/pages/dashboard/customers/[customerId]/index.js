import { useCallback, useState, useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import {
  Avatar,
  Box,
  Button, CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { customerApi } from '../../../../__fake-api__/customer-api';
import { AuthGuard } from '../../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../../components/dashboard/dashboard-layout';
import { CustomerBasicDetails } from '../../../../components/dashboard/customer/customer-basic-details';
import { CustomerDataManagement } from '../../../../components/dashboard/customer/customer-data-management';
import { CustomerEmailsSummary } from '../../../../components/dashboard/customer/customer-emails-summary';
import { CustomerInvoices } from '../../../../components/dashboard/customer/customer-invoices';
import { CustomerPayment } from '../../../../components/dashboard/customer/customer-payment';
import { CustomerLogs } from '../../../../components/dashboard/customer/customer-logs';
import { useMounted } from '../../../../hooks/use-mounted';
import { ChevronDown as ChevronDownIcon } from '../../../../icons/chevron-down';
import { PencilAlt as PencilAltIcon } from '../../../../icons/pencil-alt';
import { gtm } from '../../../../lib/gtm';
import { getInitials } from '../../../../utils/get-initials';
import { OrderListTableCustomers } from '../../../../components/dashboard/order/order-list-customers';
import { orderApi } from '../../../../__fake-api__/order-api';
import { OrderListTable } from '../../../../components/dashboard/order/order-list-table';

const tabs = [
  { label: 'Профиль', value: 'profile' },
  { label: 'Заказы', value: 'orders' }
  // { label: 'Invoices', value: 'invoices' },
  // { label: 'Logs', value: 'logs' }
];

const applyFilters = (customers, filters) => customers.filter((customer) => {
  if (filters.query) {
    let queryMatched = false;
    const properties = ['email', 'name'];

    properties.forEach((property) => {
      if (customer[property].toLowerCase().includes(filters.query.toLowerCase())) {
        queryMatched = true;
      }
    });

    if (!queryMatched) {
      return false;
    }
  }

  if (filters.user && !customer.user) {
    return false;
  }

  if (filters.moderator && !customer.moderator) {
    return false;
  }

  if (filters.admin && !customer.admin) {
    return false;
  }

  return true;
});

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (order, orderBy) => (order === 'desc'
  ? (a, b) => descendingComparator(a, b, orderBy)
  : (a, b) => -descendingComparator(a, b, orderBy));

const applySort = (customers, sort) => {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = customers.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a[0], b[0]);

    if (newOrder !== 0) {
      return newOrder;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
};

const applyPagination = (list, page, rowsPerPage) => list.slice(page * rowsPerPage,
  page * rowsPerPage + rowsPerPage);

const CustomerDetails = () => {
  const isMounted = useMounted();
  const [customer, setCustomer] = useState(null);
  const [currentTab, setCurrentTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getCustomer = useCallback(async () => {
    try {
      const data = await customerApi.getCustomer();
      const dataOrders = await orderApi.getOrders();

      if (isMounted()) {
        setCustomer(data);
        setOrders(dataOrders);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getCustomer();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const paginatedOrders = applyPagination(orders, page, rowsPerPage);

  if (!customer) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Dashboard: Customer Details | Material Kit Pro
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
          <div>
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
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid
                item
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden'
                }}
              >
                <Avatar
                  src={customer.avatar}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64
                  }}
                >
                  {getInitials(customer.name)}
                </Avatar>
                <div>
                  <Typography variant="h4">
                    {customer.email}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Typography variant="subtitle2">
                      user_id:
                    </Typography>
                    <Chip
                      label={customer.id}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </Box>
                </div>
              </Grid>
              <Grid
                item
                sx={{ m: -1 }}
              >
                <NextLink
                  href="/dashboard/customers/1/edit"
                  passHref
                >
                  <Button
                    component="a"
                    endIcon={(
                      <PencilAltIcon fontSize="small"/>
                    )}
                    sx={{ m: 1 }}
                    variant="outlined"
                  >
                    Изменить
                  </Button>
                </NextLink>
                <Button
                  color={customer.isVerified ? 'error' : 'success'}
                  variant="outlined"
                >
                  Заблокировать
                </Button>
                {/*<Button*/}
                {/*  endIcon={(*/}
                {/*    <ChevronDownIcon fontSize="small" />*/}
                {/*  )}*/}
                {/*  sx={{ m: 1 }}*/}
                {/*  variant="contained"*/}
                {/*>*/}
                {/*  Actions*/}
                {/*</Button>*/}
              </Grid>
            </Grid>
            <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ mt: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs>
          </div>
          <Divider/>
          <Box sx={{ mt: 3 }}>
            {currentTab === 'profile' && (
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                >
                  <CustomerBasicDetails
                    name={customer.name}
                    surname={customer.surname}
                    secondName={customer.secondName}
                    email={customer.email}
                    isVerified={customer.isVerified}
                    phone={customer.phone}
                  />
                </Grid>
                {/*<Grid*/}
                {/*  item*/}
                {/*  xs={12}*/}
                {/*>*/}
                {/*  <CustomerPayment />*/}
                {/*</Grid>*/}
                {/*<Grid*/}
                {/*  item*/}
                {/*  xs={12}*/}
                {/*>*/}
                {/*  <CustomerEmailsSummary />*/}
                {/*</Grid>*/}
                {/*<Grid*/}
                {/*  item*/}
                {/*  xs={12}*/}
                {/*>*/}
                {/*  <CustomerDataManagement />*/}
                {/*</Grid>*/}
              </Grid>
            )}
            {
              currentTab === 'orders' && <OrderListTableCustomers
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                orders={paginatedOrders}
                ordersCount={orders.length}
                page={page}
                rowsPerPage={rowsPerPage}
              />
            }
            {currentTab === 'invoices' && <CustomerInvoices/>}
            {currentTab === 'logs' && <CustomerLogs/>}
          </Box>
        </Container>
      </Box>
    </>
  );
};

CustomerDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default CustomerDetails;

