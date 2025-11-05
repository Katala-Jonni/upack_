import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box, Button,
  CardContent,
  Divider,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch, TableCell,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { useAction } from '../../../hooks/use-actions';
import { setLocale } from 'yup';
import { status } from '../../../utils/category';

setLocale({
  number: {
    min: 'Минимальное значение ${min}'
  }
});

const OrderEditForm = (props) => {
  const { item, handleCancelEdit, order } = props;
  const { startEditProductOrder } = useAction();
  const min = 1;
  const formik = useFormik({
    initialValues: {
      count: item.count
    },
    validationSchema: Yup.object({
      count: Yup.number().min(1).required('Укажите количество от 1')
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        if (values.count >= min) {
          // await startEditProduct({ order, product: item, values, toast });
          await startEditProductOrder({ order, item, values, toast });
        }
      } catch (err) {
        console.error(err);
        toast.error('Что-то пошло не так! Повторите.');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={12}
            xs={12}
          >
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  sx={{ mb: 2 }}
                  error={Boolean(formik.touched.count && formik.errors.count)}
                  fullWidth
                  helperText={formik.touched.count && formik.errors.count}
                  label="Укажите количество"
                  name="count"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  min={0}
                  value={formik.values.count}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      {/*<Divider/>*/}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          px: 2,
          py: 1
        }}
      >
        {formik.values.count < min
          ? null
          : <Button
            // onClick={handleUpdateProduct}
            sx={{ m: 1 }}
            type="submit"
            variant="contained"
          >
            Изменить
          </Button>
        }
        <Button
          onClick={handleCancelEdit}
          sx={{ m: 1 }}
          variant="outlined"
        >
          Свернуть
        </Button>
      </Box>
    </form>
  );
};

OrderEditForm.propTypes = {};

export default OrderEditForm;
