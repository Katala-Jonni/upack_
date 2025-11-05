import React, { useEffect, useState } from 'react';
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
import { useAction } from '../../../hooks/use-actions';
import { useSelector } from 'react-redux';
import { status } from '../../../utils/category';

// const categoryOptions = [
//   {
//     label: 'Healthcare',
//     value: 'healthcare'
//   },
//   {
//     label: 'Makeup',
//     value: 'makeup'
//   },
//   {
//     label: 'Dress',
//     value: 'dress'
//   },
//   {
//     label: 'Skincare',
//     value: 'skincare'
//   },
//   {
//     label: 'Jewelry',
//     value: 'jewelry'
//   },
//   {
//     label: 'Blouse',
//     value: 'blouse'
//   }
// ];

export const ProductEditForm = (props) => {
  const { product } = props;
  const [files, setFiles] = useState([]);
  const { options } = useSelector(({ category }) => category);
  const { startEditProduct } = useAction();

  const formik = useFormik({
    initialValues: {
      categoryId: product?.categoryId,
      description: product?.description,
      images: product?.images,
      title: product?.title,
      price: product?.price,
      composition: product?.composition,
      weight: product?.weight,
      active: product?.active === status.active
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

  // useEffect(() => {
  //   loadCategory();
  //   startCurrentProduct({ slug: router.query.productId });
  // }, []);
  //
  // useEffect(() => {
  //   setCategoryOptions(options);
  //   seProduct(currentProduct);
  // }, [options, currentProduct]);

  // console.log('product', product);
  //
  // console.log('formik.values', formik.values);

  const handleDrop = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemove = (file) => {
    setFiles((prevFiles) => prevFiles.filter((_file) => _file.path !== file.path));
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };

  if (!options) {
    return (
      <Typography variant="h6">
        Товар не найден!
      </Typography>
    );
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      {...props}>
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Основная информация
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <TextField
                sx={{ mb: 2 }}
                error={Boolean(formik.touched.categoryId && formik.errors.categoryId)}
                fullWidth
                label="Выберите категорию"
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
              <TextField
                sx={{ mb: 2 }}
                error={Boolean(formik.touched.description && formik.errors.description)}
                fullWidth
                helperText={formik.touched.description && formik.errors.description}
                label="Опишите товар"
                multiline
                rows={4}
                name="description"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.description}
              />
              <TextField
                sx={{ mb: 2 }}
                error={Boolean(formik.touched.composition && formik.errors.composition)}
                fullWidth
                helperText={formik.touched.composition && formik.errors.composition}
                label="Укажите состав через запятую"
                multiline
                rows={4}
                name="composition"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.composition}
              />
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
              <TextField
                sx={{ mb: 2 }}
                error={Boolean(formik.touched.weight && formik.errors.weight)}
                fullWidth
                helperText={formik.touched.weight && formik.errors.weight}
                label="Укажите вес (гр.)"
                name="weight"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="number"
                min={0}
                value={formik.values.weight}
              />
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
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Изображение
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                sx={{ mt: 1 }}
              >
                Изображение появится у товара.
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <FileDropzone
                accept="image/*"
                files={files}
                onDrop={handleDrop}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
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
        {/*<Button*/}
        {/*  sx={{ m: 1, mr: 'auto' }}*/}
        {/*  variant="contained"*/}
        {/*  color="error"*/}
        {/*>*/}
        {/*  Удалить*/}
        {/*</Button>*/}
        <NextLink
          href="/dashboard/products"
          passHref
        >
          <Button
            sx={{ m: 1, ml: 'auto' }}
            variant="outlined"
          >
            Отмена
          </Button>
        </NextLink>
        <Button
          sx={{ m: 1 }}
          type="submit"
          variant="contained"
        >
          Изменить
        </Button>
      </Box>
    </form>
  );
};
