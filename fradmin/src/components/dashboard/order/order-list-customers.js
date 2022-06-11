import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import {
  Box, Button,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { SeverityPill } from '../../severity-pill';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import { ru } from 'date-fns/locale';

const locale = ru;

const severityMap = {
  complete: 'success',
  pending: 'info',
  canceled: 'warning',
  rejected: 'error'
};

export const OrderListTableCustomers = (props) => {
  const {
    onPageChange,
    onRowsPerPageChange,
    orders,
    ordersCount,
    page,
    rowsPerPage,
    ...other
  } = props;

  return (
    <div {...other}>
      <Table>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              hover
              key={order.id}
              // onClick={() => onOpenDrawer?.(order.id)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <Box
                  sx={{
                    backgroundColor: (theme) => theme.palette.mode === 'dark'
                      ? 'neutral.800'
                      : 'neutral.200',
                    borderRadius: 2,
                    maxWidth: 'fit-content',
                    ml: 3,
                    p: 1
                  }}
                >
                  <Typography
                    align="center"
                    variant="subtitle2"
                  >
                    {format(order.createdAt, 'LLL', { locale }).toUpperCase()}
                  </Typography>
                  <Typography
                    align="center"
                    variant="h6"
                  >
                    {format(order.createdAt, 'd', { locale })}
                  </Typography>
                </Box>
                <Box sx={{ ml: 2 }}>
                  <NextLink
                    href="/dashboard/orders/1"
                    passHref
                  >
                    <Link href="/dashboard/orders/1">{order.number}</Link>
                  </NextLink>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    ₽{numeral(order.totalAmount).format(`0,0.00`)}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <SeverityPill color={severityMap[order.status] || 'warning'}>
                  {order.status}
                </SeverityPill>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={ordersCount}
        labelRowsPerPage='Строк на странице'
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count !== -1 ? count : `больше чем ${to}`}`}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

OrderListTableCustomers.propTypes = {
  onOpenDrawer: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  orders: PropTypes.array.isRequired,
  ordersCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
