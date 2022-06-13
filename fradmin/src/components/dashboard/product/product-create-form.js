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
import { setLocale } from 'yup';
import { FileDropzone } from '../../file-dropzone';
import { QuillEditor } from '../../quill-editor';
import NextLink from 'next/link';
import { status } from '../../../utils/category';
import { useAction } from '../../../hooks/use-actions';
import { routes } from '../../../api/routes';
import { useSelector } from 'react-redux';

setLocale({
  string: {
    min: 'Минимальное количество символов ${min}',
    max: 'Максимальное количество символов ${max}'
  },
  number: {
    min: 'Минимально ${min}',
    max: 'Максимально ${max}'
  }
});

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

export const ProductCreateForm = (props) => {
  const router = useRouter();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [files, setFiles] = useState([]);
  const [active, setActive] = useState(true);
  const { startCreateProduct } = useAction();
  const url = `${routes.dashboard}${routes.products}`;
  const { loadCategory } = useAction();
  const { options } = useSelector(({ category }) => category);
  useEffect(() => {
    loadCategory();
  }, []);

  useEffect(() => {
      setCategoryOptions(options || []);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [options]);
  const formik = useFormik({
    initialValues: {
      categoryId: '',
      description: '',
      images: [],
      title: '',
      price: 0,
      composition: '',
      weight: 0,
      active: false
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
        startCreateProduct({ values, toast, router, url });
      } catch (err) {
        console.error(err);
        toast.error('Что-то пошло не так! Повторите снова.');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleDrop = (newFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleRemove = (file) => {
    setFiles((prevFiles) => prevFiles.filter((_file) => _file.path !== file.path));
  };

  const handleRemoveAll = () => {
    setFiles([]);
  };

  const handleChangeActive = e => {
    return setActive(e.target.checked);
    // return formik.handleChange(e);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
    >
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
                {categoryOptions.map((option) => (
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
              {/*<QuillEditor*/}
              {/*  onChange={(value) => {*/}
              {/*    formik.setFieldValue('description', value);*/}
              {/*  }}*/}
              {/*  placeholder="Опишите товар"*/}
              {/*  sx={{*/}
              {/*    height: 200,*/}
              {/*    mb: 2*/}
              {/*  }}*/}
              {/*  value={formik.values.description}*/}
              {/*  modules={{*/}
              {/*    toolbar: [*/}
              {/*      ['bold', 'italic', 'underline'],*/}
              {/*      [{ 'list': 'ordered' }, { 'list': 'bullet' }],*/}
              {/*      ['clean']*/}
              {/*    ]*/}
              {/*  }}*/}
              {/*/>*/}
              {/*{(formik.touched.description && formik.errors.description) && (*/}
              {/*  <Box sx={{ mt: 2, mb: 2 }}>*/}
              {/*    <FormHelperText error>*/}
              {/*      {formik.errors.description}*/}
              {/*    </FormHelperText>*/}
              {/*  </Box>*/}
              {/*)}*/}
              {/*<QuillEditor*/}
              {/*  onChange={(value) => {*/}
              {/*    formik.setFieldValue('composition', value);*/}
              {/*  }}*/}
              {/*  placeholder="Укажите состав через запятую"*/}
              {/*  sx={{*/}
              {/*    height: 200,*/}
              {/*    mb: 2*/}
              {/*  }}*/}
              {/*  value={formik.values.composition}*/}
              {/*  modules={{*/}
              {/*    toolbar: [*/}
              {/*      ['bold', 'italic', 'underline'],*/}
              {/*      ['clean']*/}
              {/*    ]*/}
              {/*  }}*/}
              {/*/>*/}
              {/*{(formik.touched.composition && formik.errors.composition) && (*/}
              {/*  <Box sx={{ mt: 2, mb: 2 }}>*/}
              {/*    <FormHelperText error>*/}
              {/*      {formik.errors.composition}*/}
              {/*    </FormHelperText>*/}
              {/*  </Box>*/}
              {/*)}*/}
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
        {formik.isValid && formik.touched && formik.dirty
          ? <Button
            sx={{ m: 1 }}
            type="submit"
            variant="contained"
          >
            Создать
          </Button>
          : null
        }
      </Box>
    </form>
  );
};
