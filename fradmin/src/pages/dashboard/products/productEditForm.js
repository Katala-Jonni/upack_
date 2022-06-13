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
import { status } from '../../../utils/category';

const ProductEditForm = (props) => {
  const { product, handleCancelEdit, options } = props;
  const { startEditProduct } = useAction();
  const formik = useFormik({
    initialValues: {
      categoryId: product.categoryId,
      description: product.description,
      images: product.images,
      title: product.title,
      price: product.price,
      composition: product.composition,
      weight: product.weight,
      active: product.active === status.active
    },
    validationSchema: Yup.object({
      categoryId: Yup.string().max(255).required('Выберите категорию'),
      description: Yup.string().min(4).max(300).required('Опишите товар'),
      composition: Yup.string().min(4).max(100).required('Укажите состав'),
      weight: Yup.number().min(1).required('Укажите вес в гр.'),
      images: Yup.array(),
      title: Yup.string().min(4).max(50).required('Укажите наименование товара'),
      price: Yup.number().min(1).required('Укажите цену'),
      active: Yup.bool()
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        await startEditProduct({ product, values, toast });
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
            <Typography variant="h6">
              Основная информация
            </Typography>
            <Divider sx={{ my: 2 }}/>
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
                  error={Boolean(formik.touched.categoryId && formik.errors.categoryId)}
                  fullWidth
                  label="Категория"
                  name="categoryId"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  select
                  value={formik.values.categoryId}
                >
                  {options.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                    >
                      {`${option.label[0].toUpperCase()}${option.label.slice(1)}`}
                    </MenuItem>
                  ))}
                </TextField>
                {/*<TextField*/}
                {/*  defaultValue={product.categoryId}*/}
                {/*  fullWidth*/}
                {/*  label="Категория"*/}
                {/*  select*/}
                {/*>*/}
                {/*  {options.map((option) => (*/}
                {/*    <MenuItem*/}
                {/*      key={option.value}*/}
                {/*      value={option.value}*/}
                {/*    >*/}
                {/*      {`${option.label[0].toUpperCase()}${option.label.slice(1)}`}*/}
                {/*    </MenuItem>*/}
                {/*  ))}*/}
                {/*</TextField>*/}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  sx={{ mb: 2 }}
                  error={Boolean(formik.touched.title && formik.errors.title)}
                  fullWidth
                  helperText={formik.touched.title && formik.errors.title}
                  label="Наименование"
                  name="title"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
                {/*<TextField*/}
                {/*  defaultValue={product.title}*/}
                {/*  fullWidth*/}
                {/*  label="Наименование"*/}
                {/*  name="title"*/}
                {/*/>*/}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  sx={{ mb: 2 }}
                  error={Boolean(formik.touched.price && formik.errors.price)}
                  fullWidth
                  helperText={formik.touched.price && formik.errors.price}
                  label="Укажите цену (₽)"
                  name="price"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="number"
                  min={0}
                  value={formik.values.price}
                />
                {/*<TextField*/}
                {/*  // error={Boolean(formik.touched.newPrice && formik.errors.newPrice)}*/}
                {/*  fullWidth*/}
                {/*  label="Укажите цену (₽)"*/}
                {/*  name="price"*/}
                {/*  // onBlur={formik.handleBlur}*/}
                {/*  // onChange={formik.handleChange}*/}
                {/*  type="number"*/}
                {/*  value={product.price}*/}
                {/*  // value={formik.values.newPrice}*/}
                {/*/>*/}
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <FormControlLabel
                  control={<Switch
                    // checked={active}
                    checked={formik.values.active}
                    name='active'
                    onChange={formik.handleChange}
                    // onChange={handleChangeActive}
                  />}
                  label="Активный?"
                />
                {/*<FormControlLabel*/}
                {/*  control={<Switch/>}*/}
                {/*  label="Активный?"*/}
                {/*/>*/}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
      <Divider/>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          px: 2,
          py: 1
        }}
      >
        <Button
          // onClick={handleUpdateProduct}
          sx={{ m: 1 }}
          type="submit"
          variant="contained"
        >
          Изменить
        </Button>
        <Button
          onClick={handleCancelEdit}
          sx={{ m: 1 }}
          variant="outlined"
        >
          Отмена
        </Button>
        {/*<Button*/}
        {/*  onClick={handleDeleteProduct}*/}
        {/*  color="error"*/}
        {/*  sx={{*/}
        {/*    m: 1,*/}
        {/*    ml: 'auto'*/}
        {/*  }}*/}
        {/*>*/}
        {/*  Удалить*/}
        {/*</Button>*/}
      </Box>
    </form>
  );
};

ProductEditForm.propTypes = {};

export default ProductEditForm;
