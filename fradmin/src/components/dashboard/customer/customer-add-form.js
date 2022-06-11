import NextLink from 'next/link';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { wait } from '../../../utils/wait';
import { roleOptions } from '../../../utils/roles';

export const CustomerAddForm = (props) => {
  const { customer, ...other } = props;
  const formik = useFormik({
    initialValues: {
      email: customer?.email || '',
      isVerified: customer?.isVerified || false,
      name: customer?.name || '',
      surname: customer?.surname || '',
      secondName: customer?.secondName || '',
      phone: customer?.phone || '',
      role: customer?.role || roleOptions[0].value,
      password: '',
      passwordConfirm: ''
    },
    validationSchema: Yup.object({
      password: customer
        ? Yup.string()
          .max(255)
        : Yup.string()
          .max(255)
          .required('Укажите пароль'),
      passwordConfirm: customer
        ? Yup.string()
          .max(255)
          .oneOf([Yup.ref('password'), null], 'Не совпадает с паролем')
        : Yup.string()
          .max(255)
          .oneOf([Yup.ref('password'), null], 'Не совпадает с паролем')
          .required('Должен совпадать с паролем'),
      email: Yup
        .string()
        .email('Укажите валидный email')
        .max(255)
        .required('Укажите email'),
      isVerified: Yup.bool(),
      name: Yup
        .string()
        .max(255)
        .required('Укажите имя'),
      surname: Yup
        .string()
        .max(255),
      secondName: Yup
        .string()
        .max(255),
      phone: Yup.string()
        .max(15)
        .required('Укажите телефон, формат: +7-999-888-77-00'),
      role: Yup.string()
    }),
    onSubmit: async (values, helpers) => {
      try {
        // NOTE: Make API request
        await wait(500);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        console.log('values', values);
        toast.success('Customer updated!');
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
      onSubmit={formik.handleSubmit}
      {...other}>
      <Card>
        <CardHeader title="Основная информация"/>
        <Divider/>
        <CardContent>
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
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Имя"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.name}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // required
                value={formik.values.email}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.surname && formik.errors.surname)}
                fullWidth
                helperText={formik.touched.surname && formik.errors.surname}
                label="Фамилия"
                name="surname"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.surname}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label="Телефон"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.phone}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.secondName && formik.errors.secondName)}
                fullWidth
                helperText={formik.touched.secondName && formik.errors.secondName}
                label="Отчество"
                name="secondName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.secondName}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.role && formik.errors.role)}
                fullWidth
                label="Выберите роль"
                helperText={formik.touched.role && formik.errors.role}
                name="role"
                select
                // SelectProps={{ native: true }}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.role}
              >
                {roleOptions.map((option) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
              mt: 3,
              mb: 3
            }}
          >
            <div>
              <Typography
                gutterBottom
                variant="subtitle1"
              >
                Активный?
              </Typography>
            </div>
            <Switch
              checked={formik.values.isVerified}
              color="primary"
              edge="start"
              name="isVerified"
              onChange={formik.handleChange}
              value={formik.values.isVerified}
            />
          </Box>
          <Divider/>
        </CardContent>
        {customer
          ? <CardActions
            sx={{
              flexWrap: 'wrap',
              m: -1
            }}
          >
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              sx={{ m: 1 }}
              variant="contained"
            >
              Сохранить
            </Button>
            <NextLink
              href="/dashboard/customers"
              passHref
            >
              <Button
                component="a"
                disabled={formik.isSubmitting}
                sx={{
                  m: 1,
                  mr: 'auto'
                }}
                variant="outlined"
              >
                Отмена
              </Button>
            </NextLink>
          </CardActions>
          : null
        }
      </Card>
      {!customer
        ? <Card sx={{ mt: 4 }}>
          <CardHeader title="Безопасность"/>
          <Divider/>
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
              >
                <TextField
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  type='password'
                  label="Пароль"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  error={Boolean(formik.touched.passwordConfirm && formik.errors.passwordConfirm)}
                  fullWidth
                  helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                  type='password'
                  label="Повторите пароль"
                  name="passwordConfirm"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.passwordConfirm}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider/>
          <CardActions
            sx={{
              flexWrap: 'wrap',
              m: -1
            }}
          >
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              sx={{ m: 1 }}
              variant="contained"
            >
              Сохранить
            </Button>
            <NextLink
              href="/dashboard/customers"
              passHref
            >
              <Button
                component="a"
                disabled={formik.isSubmitting}
                sx={{
                  m: 1,
                  mr: 'auto'
                }}
                variant="outlined"
              >
                Отмена
              </Button>
            </NextLink>
          </CardActions>
        </Card>
        : null
      }
    </form>
  );
};

CustomerAddForm.propTypes = {
  customer: PropTypes.object
};
