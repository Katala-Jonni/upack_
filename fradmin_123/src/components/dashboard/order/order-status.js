import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider, MenuItem,
  TextField,
  Typography,
  useMediaQuery
} from '@mui/material';
import { PropertyList } from '../../property-list';
import { PropertyListItem } from '../../property-list-item';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { setLocale } from 'yup';
import { useSelector } from 'react-redux';
import { useAction } from '../../../hooks/use-actions';

setLocale({
  string: {
    min: 'Минимальное количество символов ${min}',
    max: 'Максимальное количество символов ${max}'
  }
});

const exceptionOptions = ['new', 'reading', 'all'];

const getOptions = options => options.filter(o => !exceptionOptions.includes(o.value));


const statusOptions = ['Готовится', 'Отменено', 'Закрыт'];

export const OrderStatus = (props) => {
  const { order, ...other } = props;
  const smDown = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [status, setStatus] = useState();
  const { tabs, items } = useSelector(({ stage }) => stage);
  const { startEditOrderStatus } = useAction();
  const causeRejectedField = 'canceled';

  const formik = useFormik({
    initialValues: {
      stage: '',
      causeRejected: ''
    },
    validationSchema: Yup.object({
      stage: Yup.string().required('Выберите статус')
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        if (values.stage === causeRejectedField && !values.causeRejected) {
          return toast.error('Укажите причину отмены');
        }
        return await startEditOrderStatus({ values, order, stages: items.stages, toast });
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const align = smDown ? 'vertical' : 'horizontal';
  const address = `${order.street}, корпус ${order.building ? order.building : '___'}, дом ${order.house}, квартира/офис/комната ${order.apartment ? order.apartment : '___'}`;
  const currentStage = formik.values.stage;

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card {...other}>
        <PropertyList>
          <PropertyListItem
            // align={align}
            label=""
          >
            <Box
              sx={{
                alignItems: {
                  sm: 'center'
                },
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  sm: 'row'
                },
                mx: -1
              }}
            >
              <TextField
                error={Boolean(formik.touched.stage && formik.errors.stage)}
                fullWidth
                label="Изменить статус заказа"
                margin="normal"
                name="stage"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                select
                value={formik.values.stage}
                // SelectProps={{ native: true }}
                sx={{
                  flexGrow: 1,
                  m: 1,
                  minWidth: 150
                }}
              >
                {getOptions(tabs).map((field) => (
                  <MenuItem
                    key={field.value}
                    value={field.value}
                  >
                    {field.label}
                  </MenuItem>
                ))}
              </TextField>
              {order.stage.status !== formik.values.stage && formik.values.stage
                ? <Button
                  type="submit"
                  sx={{ m: 1 }}
                  variant="contained"
                >
                  Изменить
                </Button>
                : null
              }
            </Box>
            {currentStage === causeRejectedField
              ? <Box
                sx={{
                  alignItems: {
                    sm: 'center'
                  },
                  display: 'flex',
                  flexDirection: {
                    xs: 'column',
                    sm: 'row'
                  }
                  // mx: -1
                }}
              >
                <TextField
                  sx={{ mb: 2 }}
                  error={Boolean(formik.touched.causeRejected && formik.errors.causeRejected)}
                  fullWidth
                  helperText={formik.touched.causeRejected && formik.errors.causeRejected}
                  label="Причина отмены"
                  name="causeRejected"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.causeRejected.trim()}
                >
                </TextField>
              </Box>
              : null
            }
          </PropertyListItem>
        </PropertyList>
      </Card>
    </form>
  );
};

OrderStatus.propTypes = {
  order: PropTypes.object.isRequired
};
