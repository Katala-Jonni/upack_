'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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
import { deleteStorage, storageKey } from '../../../storage';
import useCart from '../../../hooks/useCart';
import { Paragraph } from '../../../components/Typography';
import { fetchApi } from '../../../api/fetch';
import { routes } from '../../../api/routes';

const checkoutSchema = yup.object().shape({
  date: yup.string().required('Укажите желаемую дату доставки'),
  time: yup.string().required('Укажите желаемое время доставки'),
  address: yup.string().required('Укажите адрес доставки'),
  name: yup.string().required('Укажите имя'),
  surname: yup.string().required('Укажите фамилию'),
  email: yup.string().email('формат u_pack@internet.ru').required('Укажите E-mail'),
  phone: yup.number().required('Укажите номер телефона')
});


export default function CheckoutForm() {
  const router = useRouter();
  const [hasVoucher, setHasVoucher] = useState(false);
  const {
    state,
    dispatch
  } = useCart();

  useEffect(() => {
    if (!state.cart.length) {
      return router.push('/');
    }
  });

  const toggleHasVoucher = () => setHasVoucher(has => !has);

  const initialValues = {
    organization: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
    date: '',
    time: '',
    surname: '',
    name: ''
  };

  const handleFormSubmit = async (values, data) => {
    // const error = !values.street || !values.phone || !values.mail || !values.date || !values.time;
    // if (error) return false;
    console.log('valuesCheckout-alt-form', values);
    console.log('valuesCheckout-alt-formdata', data);
    const cart =  [
      {
        "count": 50,
        "id": "0865fc4c-056c-11ef-81b8-fa163eb77d5d",
        "imgUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAA",
        "name": "Форма алюминиевая, прямоугольная, L-край, 217 х 133 мм, 865 мл, 50 шт.",
        "price": 10.43,
        "qty": 50
      }
    ];
    const order = {
      ...values,
      cart
    };
    try {
      // const res = await fetchApi.create(`${routes.order}`, values);
      const res = await fetch('https://upack-10.ru/api/order', {
        method: 'POST', // Specify the HTTP method as POST
        headers: {
          'Content-Type': 'application/json' // Indicate that the body contains JSON data
        },
        body: JSON.stringify({order}) // Convert the JavaScript object to a JSON string
      })
        // .then(response => {
        //   if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        //   }
        //   return response.json(); // Parse the JSON response from the server
        // })
        .then(data => {
          console.log('Success:', data); // Handle the successful response data
        })
        .catch(error => {
          console.error('Error:', error); // Handle any errors during the fetch operation
        });
      // const res = await fetchApi.create(`${routes.order}`, {order});
      // console.log('handleFormSubmitOrder', res);
      // console.log('startLoadCategory', res.data);
      // return res.data;
    } catch (e) {
      console.error('startLoadCategory', e);
    }
    // dispatch({
    //   type: 'REMOVE_CART_AMOUNT',
    //   payload: []
    // });
    // localStorage.removeItem(storageKey);
    // data.resetForm({});
    // router.push('/');
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
        // console.log('CheckoutFormVvalue, fieldName', value, fieldName);
        setFieldValue(fieldName, value);
      };

      return <form onSubmit={handleSubmit}>
        {/*<ContactInfo handleFieldValueChange={handleFieldValueChange} values={values}/>*/}
        <DeliveryDate errors={errors} values={values} touched={touched} handleChange={handleChange}/>
        {/*<DeliveryAddress handleFieldValueChange={handleFieldValueChange} values={values} errors={errors}/>*/}
        <PaymentDetails values={values} errors={errors} touched={touched} hasVoucher={hasVoucher}
                        handleChange={handleChange} toggleHasVoucher={toggleHasVoucher}
                        handleFieldValueChange={handleFieldValueChange}/>
        <CommentDetails values={values} handleFieldValueChange={handleFieldValueChange}/>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ mr: 1 }}
          disabled={!!errors.street || !!errors.phone || !!errors.mail || !!errors.date || !!errors.time}
        >
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
