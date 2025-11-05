'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup'; // LOCAL CUSTOM COMPONENTS

import DeliveryDate from './delivery-date';
import PaymentDetails from './payment-details';
import DeliveryAddress from './delivery-address';
import ContactInfo from './contact-info';
import CommentDetails from './comment-detail';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import { log } from 'next/dist/server/typescript/utils';

const checkoutSchema = yup.object().shape({
  // card: yup.string().required("required"),
  date: yup.string().required("Укажите желаемую дату доставки"),
  time: yup.string().required("Укажите желаемое время доставки"),
  address: yup.string().required("Укажите контактную информацию"),
  // cardHolderName: yup.string().required("required"),
  // cardNumber: yup.number().required("required"),
  // cardMonth: yup.string().required("required"),
  // cardYear: yup.number().required("required"),
  // cardCVC: yup.number().required("required"),
  // voucher: yup.string(),
  // name: yup.string().required("Заполните поле"),
  // phone: yup.number().required("Заполните поле, только цифры"),
  // street1: yup.string().required("Заполните поле"),
  // street2: yup.string().required("Заполните поле")
});
export default function CheckoutForm() {
  const router = useRouter();
  const [hasVoucher, setHasVoucher] = useState(false);

  const toggleHasVoucher = () => setHasVoucher(has => !has);

  const initialValues = {
    name: '',
    phone: '',
    email: '',
    street2: '',
    comment: '',
    // card: "",
    date: "",
    time: "",
    address: "",
    // voucher: "",
    // cardHolderName: "",
    // cardNumber: "",
    // cardMonth: "",
    // cardYear: "",
    // cardCVC: ""
  };

  const handleFormSubmit = async (values, data) => {
    console.log('valuesCheckout-alt-form', values);
    console.log('valuesCheckout-alt-formdata', data);
    // data.resetForm({});
    // router.push("/payment");
  };

  return <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={checkoutSchema}>
    {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue
      }) => {
      // CHANGE FIELD VALUE DATA
      const handleFieldValueChange = (value, fieldName) => {
        console.log('CheckoutFormVvalue, fieldName', value, fieldName);
        setFieldValue(fieldName, value);
      };
      console.log('CheckoutFormErrors', errors);

      return <form onSubmit={handleSubmit}>
        {/*<ContactInfo handleFieldValueChange={handleFieldValueChange} values={values}/>*/}
        <DeliveryDate errors={errors} values={values} touched={touched} handleChange={handleChange} />
        <DeliveryAddress handleFieldValueChange={handleFieldValueChange} values={values} errors={errors}/>
        <CommentDetails values={values} handleFieldValueChange={handleFieldValueChange}/>
        {/*<PaymentDetails values={values} errors={errors} touched={touched} hasVoucher={hasVoucher} handleChange={handleChange} toggleHasVoucher={toggleHasVoucher} handleFieldValueChange={handleFieldValueChange} />*/}
        <Button type="submit" color="primary" variant="contained" sx={{ mr: 1 }}>
          Оформить заказ
        </Button>
        {/*<Button*/}
        {/*  color="primary"*/}
        {/*  href="/cart"*/}
        {/*  variant="outlined"*/}
        {/*  LinkComponent={Link}*/}
        {/*>*/}
        {/*  Посмотреть весь заказ*/}
        {/*</Button>*/}
      </form>;
    }}
  </Formik>;
}
