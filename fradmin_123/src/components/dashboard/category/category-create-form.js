import React, { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { setLocale } from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  FormHelperText,
  Grid, Link,
  MenuItem,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { FileDropzone } from '../../file-dropzone';
import { QuillEditor } from '../../quill-editor';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NextLink from 'next/link';
import { routes as route } from '../../../api/routes';
import { useAction } from '../../../hooks/use-actions';

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

setLocale({
  string: {
    min: 'Минимальное количество символов ${min}',
    max: 'Максимальное количество символов ${max}'
  },
});

export const CategoryCreateForm = (props) => {
  const router = useRouter();
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const { dashboard, products, category } = route;
  const url = `${dashboard}${products}${category}`;
  const { startCreateCategory } = useAction();
  const minLengthName = 3;
  const handleChangeName = e => {
    setName(e.target.value.trim());
    formik.handleChange(e);
  };
  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().min(4).max(255).required('Укажите наименование категории')
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        if (name && name.length > minLengthName) {
          await startCreateCategory({ values, toast, router, url });
        }
        // toast.success('Категория создана');
        // await router.push(url);
      } catch (err) {
        console.error(err);
        toast.error('Что-то пошло не так! Повторите.');
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
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Наименование"
                name="name"
                onBlur={formik.handleBlur}
                onChange={handleChangeName}
                value={formik.values.name.trim()}
              />
            </Grid>
          </Grid>
          {/*<Grid*/}
          {/*  container*/}
          {/*  spacing={3}*/}
          {/*  sx={{*/}
          {/*    mt: 0.5,*/}
          {/*    justifyContent: 'flex-end'*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <Grid*/}
          {/*    item*/}
          {/*    md={8}*/}
          {/*    xs={12}*/}
          {/*  >*/}
          {/*    <FormControlLabel*/}
          {/*      control={<Switch defaultChecked/>}*/}
          {/*      label="Активна?"*/}
          {/*    />*/}
          {/*  </Grid>*/}
          {/*</Grid>*/}
        </CardContent>
      </Card>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
          mx: -1,
          mb: -1,
          mt: 3
        }}
      >
        <NextLink
          href={url}
          passHref
        >
          <Button
            sx={{ m: 1 }}
            variant="outlined"
          >
            Отмена
          </Button>
        </NextLink>
        {name && name.length > minLengthName
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
