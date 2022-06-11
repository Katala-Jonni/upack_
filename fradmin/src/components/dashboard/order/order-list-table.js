import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import {
  Box, IconButton,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import NextLink from 'next/link';
import { SeverityPill } from '../../severity-pill';
import { PencilAlt as PencilAltIcon } from '../../../icons/pencil-alt';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';


/*
*  'primary',
    'secondary',
    'error',
    'info',
    'warning',
    'success'
* */

export const severityMap = {
  new: 'warning',
  reading: 'primary',
  pending: 'info',
  canceled: 'error',
  closed: 'success'
};

export const statusMap = {
  new: 'Новый',
  reading: 'Прочитано',
  pending: 'Готовится',
  canceled: 'Отменено',
  closed: 'Закрыт'
};

export const OrderListTable = (props) => {
  const {
    onOpenDrawer,
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
                    {format(order.createdAt, 'LLL').toUpperCase()}
                  </Typography>
                  <Typography
                    align="center"
                    variant="h6"
                  >
                    {format(order.createdAt, 'd')}
                  </Typography>
                </Box>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="subtitle2">
                    {order.number}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Итого:
                    {' '}
                    {numeral(order.totalAmount).format()}₽
                  </Typography>
                </Box>
              </TableCell>
              <TableCell align="right">
                <SeverityPill color={severityMap[order.status] || 'secondary'}>
                  {statusMap[order.status]}
                </SeverityPill>
              </TableCell>
              <TableCell align="right">
                <NextLink
                  href={`/dashboard/orders/${order.id}`}
                  passHref
                >
                  <IconButton component="a">
                    <ArrowRightIcon fontSize="small"/>
                  </IconButton>
                </NextLink>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        labelRowsPerPage='Строк на странице'
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} из ${count !== -1 ? count : `больше чем ${to}`}`}
        count={ordersCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

OrderListTable.propTypes = {
  onOpenDrawer: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  orders: PropTypes.array.isRequired,
  ordersCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};
