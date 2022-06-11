import { useState } from 'react';
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

export const ProductEditForm = (props) => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const formik = useFormik({
    initialValues: {
      barcode: '925487986526',
      category: '',
      description: '',
      images: [],
      name: '',
      newPrice: 0,
      oldPrice: 0,
      sku: 'IYV-8745',
      submit: null
    },
    validationSchema: Yup.object({
      barcode: Yup.string().max(255),
      category: Yup.string().max(255),
      description: Yup.string().max(5000),
      images: Yup.array(),
      name: Yup.string().max(255).required(),
      newPrice: Yup.number().min(0).required(),
      oldPrice: Yup.number().min(0),
      sku: Yup.string().max(255)
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        toast.success('Product created!');
        router.push('/dashboard/products');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
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
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Наименование"
                name="title"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              <QuillEditor
                onChange={(value) => {
                  formik.setFieldValue('description', value);
                }}
                placeholder="Опишите товар"
                sx={{
                  height: 200,
                  mb: 2
                }}
                value={formik.values.description}
                modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['clean']
                  ]
                }}
              />
              {(formik.touched.description && formik.errors.description) && (
                <Box sx={{ mt: 2, mb: 2 }}>
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                </Box>
              )}
              <QuillEditor
                onChange={(value) => {
                  formik.setFieldValue('description', value);
                }}
                placeholder="Укажите состав через запятую"
                sx={{
                  height: 200,
                  mb: 2
                }}
                value={formik.values.description}
                modules={{
                  toolbar: [
                    ['bold', 'italic', 'underline'],
                    ['clean']
                  ]
                }}
              />
              {(formik.touched.description && formik.errors.description) && (
                <Box sx={{ mt: 2, mb: 2 }}>
                  <FormHelperText error>
                    {formik.errors.description}
                  </FormHelperText>
                </Box>
              )}
              <TextField
                sx={{ mb: 2 }}
                error={Boolean(formik.touched.newPrice && formik.errors.newPrice)}
                fullWidth
                label="Укажите цену (₽)"
                name="price"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="number"
                value={formik.values.newPrice}
              />
              <TextField
                sx={{ mb: 2 }}
                error={Boolean(formik.touched.oldPrice && formik.errors.oldPrice)}
                fullWidth
                label="Укажите вес (гр.)"
                name="weight"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="number"
                value={formik.values.oldPrice}
              />
              <FormControlLabel
                control={<Switch defaultChecked/>}
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
        <Button
          sx={{ m: 1, mr: 'auto' }}
          variant="contained"
          color="error"
        >
          Удалить
        </Button>
        <NextLink
          href="/dashboard/products"
          passHref
        >
          <Button
            sx={{ m: 1}}
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
