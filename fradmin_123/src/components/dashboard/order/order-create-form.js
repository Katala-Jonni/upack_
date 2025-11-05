import React, { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { FileDropzone } from '../../file-dropzone';
import { QuillEditor } from '../../quill-editor';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { OrderItems } from './order-items';
import { useSelector } from 'react-redux';

const categoryOptions = [
  {
    label: 'Healthcare',
    value: 'healthcare'
  },
  {
    label: 'Makeup',
    value: 'makeup'
  },
  {
    label: 'Dress',
    value: 'dress'
  },
  {
    label: 'Skincare',
    value: 'skincare'
  },
  {
    label: 'Jewelry',
    value: 'jewelry'
  },
  {
    label: 'Blouse',
    value: 'blouse'
  }
];

export const OrderCreateForm = (props) => {
  const { onClose } = props;
  const { items } = useSelector(({ category }) => category);
  const formik = useFormik({
    initialValues: {
      category: '',
      product: '',
      count: 1,
    },
    validationSchema: Yup.object({
      category: Yup.string().required('Укажите наименование категории'),
      product: Yup.string().max(5000),
      count: Yup.number().min(0).required()
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        toast.success('Product created!');
        onClose();
        // router.push('/dashboard/products');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return (
    <form
      onSubmit={formik.handleSubmit}>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          // md={4}
          xs={12}
        >
          <Typography variant="h6">
            Основная информация
          </Typography>
        </Grid>
        <Grid
          item
          // md={8}
          xs={12}
        >
          <TextField
            sx={{ mb: 2 }}
            error={Boolean(formik.touched.category && formik.errors.category)}
            fullWidth
            label="Выберите категорию"
            name="category"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            select
            value={formik.values.category}
          >
            {categoryOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{ mb: 2 }}
            error={Boolean(formik.touched.category && formik.errors.category)}
            fullWidth
            label="Выберите товар"
            name="product"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            select
            value={formik.values.category}
          >
            {categoryOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{ mb: 2 }}
            error={Boolean(formik.touched.count && formik.errors.count)}
            fullWidth
            label="Укажите количество"
            name="count"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="number"
            value={formik.values.count}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          mx: -1,
          mb: -1,
          mt: 3
        }}
      >
        <Button
          sx={{ m: 1, ml: 'auto' }}
          variant="outlined"
          onClick={onClose}
        >
          Отмена
        </Button>
        <Button
          sx={{ m: 1 }}
          type="submit"
          variant="contained"
        >
          Создать
        </Button>
      </Box>
    </form>
  );
};

OrderCreateForm.propTypes = {
  onClose: PropTypes.func.isRequired
};
