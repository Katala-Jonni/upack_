'use client';

import Grid from '@mui/material/Grid'; // GLOBAL CUSTOM HOOK

import useCart from 'hooks/useCart'; // LOCAL CUSTOM COMPONENTS

import CartItem from '../cart-item';
import CheckoutForm from '../checkout-form';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Card from '@mui/material/Card';
import { Paragraph } from '../../../components/Typography';
import React from 'react';
import { useState, useEffect } from 'react';

export default function CartPageView() {
  const [cartState, setCartState] = useState([]);
  const {
    state
  } = useCart();
  useEffect(() => {
    setCartState(state.cart)
  });
  // if (!state.cart || !state.cart.length) {
  //   return <Grid item md={12} xs={12}>
  //     <Paragraph>Ваша корзина пуста</Paragraph>
  //     <Button color="primary" href="/" variant="contained" LinkComponent={Link}>
  //       Перейти к каталогу
  //     </Button>
  //   </Grid>;
  // }
  return <Grid container spacing={3} sx={{ flexDirection: 'column' }}>

    {
      /* CHECKOUT FORM */
    }
    <Grid item md={12} xs={12}>
      <CheckoutForm/>
    </Grid>

    {
      /* CART PRODUCT LIST */
    }
    <Grid container item md={12} xs={12}>
      {/*{state.cart.map(({*/}
      {cartState.map(({
                         name,
                         id,
                         price,
                         qty,
                         slug,
                         imgUrl,
                         count
                       }) =>
        <Grid item xs={12}>
          <CartItem id={id} key={id} qty={qty} name={name} slug={slug} price={price} imgUrl={imgUrl} count={count}/>
        </Grid>
      )}
    </Grid>

    <Grid item md={12} xs={12}>
      {cartState.length
        ? <Button color="primary" href="/checkout-alternative" variant="contained" LinkComponent={Link}>
          Оформить заказ
        </Button>
        : null}
    </Grid>
  </Grid>;
}
