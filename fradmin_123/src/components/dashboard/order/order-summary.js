import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import { PropertyList } from '../../property-list';
import { PropertyListItem } from '../../property-list-item';

const statusOptions = ['Готовится', 'Отменено', 'Закрыт'];

export const OrderSummary = (props) => {
  const { order, ...other } = props;
  const smDown = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [status, setStatus] = useState();

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const align = smDown ? 'vertical' : 'horizontal';
  const address = `${order.street}, корпус ${order.building ? order.building : '___'}, дом ${order.house}, квартира/офис/комната ${order.apartment ? order.apartment : '___'}`;

  return (
    <Card {...other}>
      <CardHeader title="Основная информация"/>
      <Divider/>
      <PropertyList>
        <PropertyListItem
          align={align}
          label="Дата доставки"
          value={format(new Date(order.deliveryDate), 'MM-dd-yyyy HH:mm')}
        />
        <Divider/>
        <PropertyListItem
          align={align}
          label="Пожелания"
          value={order.wishes || '-'}
        />
        <Divider/>
        <PropertyListItem
          align={align}
          label="Номер телефона"
          value={order.phone}
        />
        <Divider/>
        <PropertyListItem
          align={align}
          label="Пользователь"
        >
          <Typography
            color="primary"
            variant="body2"
          >
            {/*{order.customer.name}*/}
            {order.client ? order.client : order.guestName}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            {/*{order.customer.address1}*/}
            {order.address}
          </Typography>
          {/*<Typography*/}
          {/*  color="textSecondary"*/}
          {/*  variant="body2"*/}
          {/*>*/}
          {/*  {order.customer.city}*/}
          {/*</Typography>*/}
          {/*<Typography*/}
          {/*  color="textSecondary"*/}
          {/*  variant="body2"*/}
          {/*>*/}
          {/*  {order.customer.country}*/}
          {/*</Typography>*/}
        </PropertyListItem>
        <Divider/>
        {/*<PropertyListItem*/}
        {/*  align={align}*/}
        {/*  label="Купон"*/}
        {/*>*/}
        {/*  <Typography*/}
        {/*    color="textSecondary"*/}
        {/*    variant="body2"*/}
        {/*  >*/}
        {/*    Тип: {order?.coupon?.type === 'percent' ? 'Процент' : 'Сумма'}*/}
        {/*  </Typography>*/}
        {/*  <Typography*/}
        {/*    color="textSecondary"*/}
        {/*    variant="body2"*/}
        {/*  >*/}
        {/*    Истекает: {format(new Date(order?.coupon?.expire), 'MM-dd-yyyy HH:mm')}*/}
        {/*  </Typography>*/}
        {/*  <Typography*/}
        {/*    color="textSecondary"*/}
        {/*    variant="body2"*/}
        {/*  >*/}
        {/*    Промокод: {order?.coupon?.secret}*/}
        {/*  </Typography>*/}
        {/*</PropertyListItem>*/}
        {/*<Divider/>*/}
        <PropertyListItem
          align={align}
          label="Итого сумма"
          // value={`${order.amountMoney || 0} ₽`}
          value={`${order.basket.total || 0} ₽`}
        />
        <Divider/>
        <PropertyListItem
          align={align}
          label="Тип оплаты"
          value={order.payType === 'card' ? 'Картой' : 'Наличными'}
          // value={format(order.createdAt, 'dd/MM/yyyy HH:mm')}
        />
        <Divider/>
        <PropertyListItem
          align={align}
          label="Нужна сдача"
          value={order.payType !== 'card' && order.returnMoney ? order.amountMoney - order.totalBasket : 'Нет'}
        />
        <Divider/>
        {/*<PropertyListItem*/}
        {/*  align={align}*/}
        {/*  label="Статус"*/}
        {/*>*/}
        {/*  <Box*/}
        {/*    sx={{*/}
        {/*      alignItems: {*/}
        {/*        sm: 'center'*/}
        {/*      },*/}
        {/*      display: 'flex',*/}
        {/*      flexDirection: {*/}
        {/*        xs: 'column',*/}
        {/*        sm: 'row'*/}
        {/*      },*/}
        {/*      mx: -1*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <TextField*/}
        {/*      label="Статус"*/}
        {/*      margin="normal"*/}
        {/*      name="status"*/}
        {/*      onChange={handleChange}*/}
        {/*      select*/}
        {/*      SelectProps={{ native: true }}*/}
        {/*      sx={{*/}
        {/*        flexGrow: 1,*/}
        {/*        m: 1,*/}
        {/*        minWidth: 150*/}
        {/*      }}*/}
        {/*      value={status}*/}
        {/*    >*/}
        {/*      {statusOptions.map((statusOption) => (*/}
        {/*        <option*/}
        {/*          key={statusOption}*/}
        {/*          value={statusOption}*/}
        {/*        >*/}
        {/*          {statusOption}*/}
        {/*        </option>*/}
        {/*      ))}*/}
        {/*    </TextField>*/}
        {/*    <Button*/}
        {/*      sx={{ m: 1 }}*/}
        {/*      variant="contained"*/}
        {/*    >*/}
        {/*      Изменить*/}
        {/*    </Button>*/}
        {/*    /!*<Button sx={{ m: 1 }}>*!/*/}
        {/*    /!*  Cancel*!/*/}
        {/*    /!*</Button>*!/*/}
        {/*  </Box>*/}
        {/*</PropertyListItem>*/}
      </PropertyList>
    </Card>
  );
};

OrderSummary.propTypes = {
  order: PropTypes.object.isRequired
};
