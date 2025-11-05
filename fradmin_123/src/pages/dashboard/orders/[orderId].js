import React, { useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import { format } from 'date-fns';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Grid,
  Link,
  MenuItem,
  TableCell,
  TextField,
  Typography
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { orderApi } from '../../../__fake-api__/order-api';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { OrderItems } from '../../../components/dashboard/order/order-items';
import { OrderLogs } from '../../../components/dashboard/order/order-logs';
import { OrderSummary } from '../../../components/dashboard/order/order-summary';
import { useMounted } from '../../../hooks/use-mounted';
import { Calendar as CalendarIcon } from '../../../icons/calendar';
import { ChevronDown as ChevronDownIcon } from '../../../icons/chevron-down';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { gtm } from '../../../lib/gtm';
import { SeverityPill } from '../../../components/severity-pill';
import { severityMap, statusMap } from '../../../components/dashboard/order/order-list-table';
import { OrderAddress } from '../../../components/dashboard/order/order-address';
import { useRouter } from 'next/router';
import { useAction } from '../../../hooks/use-actions';
import { clearCurrentStage } from '../../../modules/Stage';
import { useSelector } from 'react-redux';
import { routes } from '../../../api/routes';
import { OrderStatus } from '../../../components/dashboard/order/order-status';
import { PropertyList } from '../../../components/property-list';
import { PropertyListItem } from '../../../components/property-list-item';
import CardContent from '@mui/material/CardContent';

const OrderDetails = () => {
  const router = useRouter();
  const isMounted = useMounted();
  const [order, setOrder] = useState(null);
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const { startCurrentOrder, clearCurrentOrder, endStage, endCategory, endProduct } = useAction();
  const { currentOrder } = useSelector(({ order }) => order);
  const { items: productList } = useSelector(({ product }) => product);
  const { items: categoryList } = useSelector(({ category }) => category);
  const backUrl = `${routes.dashboard}${routes.orders}`;
  const visible = currentOrder?.stage.status === 'closed' || currentOrder?.stage.status === 'canceled';

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getOrder = useCallback(async () => {
    try {
      const data = await orderApi.getOrder();

      if (isMounted()) {
        setOrder(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  // useEffect(() => {
  //     getOrder();
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   []);

  useEffect(() => {
    startCurrentOrder({ orderId: router.query.orderId });
    return function cleanUp() {
      clearCurrentOrder();
      endStage();
      endCategory();
      endProduct();
    };
  }, []);

  useEffect(() => {
    setOrder(currentOrder);
    // setProduct(productList || []);
    // setCategory(categoryList || []);
  }, [currentOrder]);

  if (!order) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Dashboard: Order Details | Material Kit Pro
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
              href={backUrl}
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
                  Все заказы
                </Typography>
              </Link>
            </NextLink>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item>
                <Typography variant="h4">
                  {order.orderNumber}
                </Typography>
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1,
                    mt: 1
                  }}
                >
                  <Typography
                    color="textSecondary"
                    variant="body2"
                    sx={{ ml: 1 }}
                  >
                    Дата
                  </Typography>
                  <CalendarIcon
                    color="action"
                    fontSize="small"
                    sx={{ ml: 1 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ ml: 1 }}
                  >
                    {format(new Date(order.createdAt), 'MM-dd-yyyy HH:mm:ss')}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item
                sx={{ ml: -2 }}
              >
                <SeverityPill color={order.stage.color || 'secondary'}>
                  {`${order.stage.title[0].toUpperCase()}${order.stage.title.slice(1)}`}
                </SeverityPill>
                {/*<Button*/}
                {/*  endIcon={(*/}
                {/*    <ChevronDownIcon fontSize="small"/>*/}
                {/*  )}*/}
                {/*  variant="contained"*/}
                {/*  sx={{ ml: 2 }}*/}
                {/*>*/}
                {/*  Action*/}
                {/*</Button>*/}
              </Grid>
            </Grid>
          </Box>
          {visible
            ? null
            : <Box sx={{ mb: 3 }}>
              <OrderStatus order={order}/>
            </Box>
          }
          {currentOrder?.stage.status === 'canceled'
          ? <Box sx={{ mb: 3 }}>
              <Card>
                <CardHeader title="Причина отмены:" />
                <CardContent sx={{pt: 0}}>
                  <Typography color="text.secondary">
                    {currentOrder.causeRejected}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          : null
          }
          <Box sx={{ mb: 3 }}>
            <OrderSummary order={order}/>
          </Box>
          <Box sx={{ mb: 3 }}>
            <OrderAddress order={order}/>
          </Box>
          <Box sx={{ mb: 3 }}>
            <OrderItems order={order} orderItems={order.basket.products}/>
          </Box>
          {/*<Box sx={{ mt: 4 }}>*/}
          {/*  <OrderLogs order={order} />*/}
          {/*</Box>*/}
        </Container>
      </Box>
    </>
  );
};

OrderDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default OrderDetails;

