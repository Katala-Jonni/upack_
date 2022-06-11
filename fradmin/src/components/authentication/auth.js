import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, Checkbox, FormHelperText, TextField, Typography, Link } from '@mui/material';
import { useAuth } from '../../hooks/use-auth';
import { useMounted } from '../../hooks/use-mounted';

const validationRuleRegistration = {
  telegram: Yup
    .string()
    .max(255)
    .required('Telegram обязательно')
};

const validationRule = {
  username: Yup
    .string()
    .max(255)
    .required('Имя пользователя обязательно'),
  password: Yup
    .string()
    .min(7)
    .max(255)
    .required('Пароль обязательно')
};

const getInitialValue = () => {
  return {
    username: '',
    telegram: '',
    password: ''
  };
};

export const Auth = (props) => {
  const isMounted = useMounted();
  const router = useRouter();
  const { register, login } = useAuth();
  const [validation, setValidation] = useState(validationRule);
  const formik = useFormik({
    initialValues: getInitialValue(),
    validationSchema: Yup.object(validation),
    onSubmit: async (values, helpers) => {
      try {
        if (props.value === 1) {
          await register(values.username, values.telegram, values.password);
        } else {
          await login(values.username, values.password);
        }

        if (isMounted()) {
          const returnUrl = router.query.returnUrl || '/dashboard/orders';
          router.push(returnUrl);
        }
      } catch (err) {
        console.error(err);

        if (isMounted()) {
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    }
  });

  useEffect(() => {
    formik.resetForm();
    if (props.value === 1) {
      const validator = Object.assign({}, validationRule, validationRuleRegistration);
      setValidation(validator);
    }
    return function cleanUp() {
      setValidation(validationRule);
    };
  }, [props.value]);

  return (
    <form
      noValidate
      onSubmit={formik.handleSubmit}
      {...props}>
      <TextField
        error={Boolean(formik.touched.username && formik.errors.username)}
        fullWidth
        helperText={formik.touched.username && formik.errors.username}
        label="Имя пользователя"
        margin="normal"
        name="username"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="username"
        value={formik.values.username}
      />
      {props.value === 1
        ? <TextField
          error={Boolean(formik.touched.telegram && formik.errors.telegram)}
          fullWidth
          helperText={formik.touched.telegram && formik.errors.telegram}
          label="Telegram"
          margin="normal"
          name="telegram"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.telegram}
        />
        : null
      }
      <TextField
        error={Boolean(formik.touched.password && formik.errors.password)}
        fullWidth
        helperText={formik.touched.password && formik.errors.password}
        label="Пароль"
        margin="normal"
        name="password"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        type="password"
        value={formik.values.password}
      />
      {Boolean(formik.touched.policy && formik.errors.policy) && (
        <FormHelperText error>
          {formik.errors.policy}
        </FormHelperText>
      )}
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>
            {formik.errors.submit}
          </FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <Button
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {props.value === 0 ? 'Войти' : 'Зарегистрироваться'}
        </Button>
      </Box>
    </form>
  );
};
