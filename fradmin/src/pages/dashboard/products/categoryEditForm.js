import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, CardContent, Divider, Grid, Switch, TextField, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';
import { setLocale } from 'yup';
import { startEditCategory } from '../../../modules/Category';
import { useAction } from '../../../hooks/use-actions';
import { status } from '../../../utils/category';

setLocale({
  string: {
    min: 'Минимальное количество символов ${min}',
    max: 'Максимальное количество символов ${max}'
  }
});

const CategoryEditForm = (props) => {
  const { product, handleCancelEdit } = props;
  const [name, setName] = useState(product.title);
  const [active, setActive] = useState(product.active === status.active);
  const { startEditCategory } = useAction();
  const minLengthName = 3;
  const handleChangeName = e => {
    setName(e.target.value.trim());
    return formik.handleChange(e);
  };

  const handleChangeActive = e => {
    return setActive(e.target.checked);
    // return formik.handleChange(e);
  };

  const formik = useFormik({
    initialValues: {
      name: product.title
    },
    validationSchema: Yup.object({
      name: Yup.string().min(4).max(255).required('Укажите наименование категории')
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        if (name && name.length > minLengthName) {
          await startEditCategory({ product, values, active, toast });
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
    <form
      onSubmit={formik.handleSubmit}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            // md={6}
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
                  // defaultValue={formik.values.name}
                  // defaultValue={product.title}
                  // defaultValue={product.name}
                  // fullWidth
                  // label="Наименование"
                  // name="name"

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
              <Grid
                item
                md={6}
                xs={12}
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <Switch
                  checked={active}
                  name='active'
                  // onBlur={formik.handleBlur}
                  onChange={handleChangeActive}
                  // checked={formik.values.active}
                  // value={formik.values.active}
                />
                <Typography variant="subtitle2">
                  Активна?
                </Typography>
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
        {name && name.length > minLengthName
          ? <Button
            // onClick={handleUpdateProduct}
            sx={{ m: 1 }}
            type="submit"
            variant="contained"
          >
            Изменить
          </Button>
          : null
        }
        <Button
          onClick={handleCancelEdit}
          sx={{ m: 1 }}
          variant="outlined"
        >
          Отмена
        </Button>
      </Box>
    </form>
  );
};

CategoryEditForm.propTypes = {};

export default CategoryEditForm;
