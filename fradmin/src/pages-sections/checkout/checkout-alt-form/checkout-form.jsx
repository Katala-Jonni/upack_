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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle'
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import { log } from 'next/dist/server/typescript/utils';
import { deleteStorage, storageKey } from '../../../storage';
import useCart from '../../../hooks/useCart';
import { Paragraph } from '../../../components/Typography';
import { fetchApi } from '../../../api/fetch';
import { routes } from '../../../api/routes';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

function AlertDialog({ isOpen = false}) {
  console.log('isOpen', isOpen);
  const [open, setOpen] = React.useState(isOpen);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}





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
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch({ type: 'REMOVE_CART_AMOUNT' });
  };

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
    // console.log('valuesCheckout-alt-form', values);
    // console.log('valuesCheckout-alt-formdata', data);
    // console.log('state.cart', state.cart);
    const cart = [
      {
        'count': 50,
        'id': '0865fc4c-056c-11ef-81b8-fa163eb77d5d',
        'imgUrl': 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAA',
        'name': 'Форма алюминиевая, прямоугольная, L-край, 217 х 133 мм, 865 мл, 50 шт.',
        'price': 10.43,
        'qty': 50
      }
    ];
    const cartToServer = state.cart.map(el => {
      return {
        name: el.name,
        price: el.price,
        qty: el.qty
      };
    });
    const order = {
      ...values,
      cart: [...cartToServer]
    };
    try {
      // const res = await fetchApi.create(`${routes.order}`, values);
      const res = await fetch('api/order', {
        method: 'POST', // Specify the HTTP method as POST
        headers: {
          'Content-Type': 'application/json' // Indicate that the body contains JSON data
        },
        body: JSON.stringify({ order }) // Convert the JavaScript object to a JSON string
      })
        // .then(response => {
        //   if (!response.ok) {
        //     throw new Error(`HTTP error! status: ${response.status}`);
        //   }
        //   return response.json(); // Parse the JSON response from the server
        // })
        .then(data => {
          // console.log('Success:', data); // Handle the successful response data
          // dispatch({ type: 'REMOVE_CART_AMOUNT' });
          // <AlertDialog isOpen={true}/>
          handleClickOpen();
          setSuccess(true);
          const timerId = setTimeout(() => {
            // console.log("Сообщение через 1 секунду");
            dispatch({ type: 'REMOVE_CART_AMOUNT' });
            clearTimeout(timerId);
          }, 3000);
        })
        .catch(error => {
          console.error('Error:', error); // Handle any errors during the fetch operation
          handleClickOpen();
          setSuccess(false);
        });
      // const res = await fetchApi.create(`${routes.order}`, {order});
      // const data = await res.json();
      // console.log('handleFormSubmitOrder', data);
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

        <Dialog
          open={open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {success ? 'Успешно отправлено' : 'Произошла ошибка, повторите снова!'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {/*<img src='/assets/images/icons/close.svg' alt="ЮПАК-27-02-08" title="ЮПАК-27-02-08" style={{*/}
              {/*  cursor: 'pointer'*/}
              {/*}}/>*/}
              {success ? 'Вы будете перенаправлены на главную страницу...' : null}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color={success ? 'info' : 'error'} onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>

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
