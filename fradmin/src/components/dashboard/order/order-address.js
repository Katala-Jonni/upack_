import { useState } from 'react';
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

export const OrderAddress = (props) => {
  const { order, ...other } = props;
  const smDown = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [status, setStatus] = useState();

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const align = smDown ? 'vertical' : 'horizontal';

  return (
    <Card {...other}>
      <CardHeader title="Адрес доставки" />
      <Divider />
      <PropertyList>
        <PropertyListItem
          align={align}
          label="Улица"
          value={order.street || '-'}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Корпус/строение"
          value={order.building || '-'}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Дом"
          value={order.house || '-'}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Квартира"
          value={order.apartment || '-'}
          // value={format(order.createdAt, 'dd/MM/yyyy HH:mm')}
        />
        <Divider />
        <PropertyListItem
          align={align}
          label="Комментарий к адресу"
          value={order.addressComment || '-'}
          // value={format(order.createdAt, 'dd/MM/yyyy HH:mm')}
        />
        <Divider />
      </PropertyList>
    </Card>
  );
};

OrderAddress.propTypes = {
  order: PropTypes.object.isRequired
};
