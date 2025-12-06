'use client';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider'; // GLOBAL CUSTOM COMPONENTS

import { Paragraph } from 'components/Typography'; // GLOBAL CUSTOM HOOK

import useCart from 'hooks/useCart'; // LOCAL CUSTOM COMPONENTS

import CartItem from './cart-item';
import ListItem from '../list-item';

export default function CheckoutAltSummary() {
  const [cartState, setCartState] = useState([]);
  const {
    state
  } = useCart();
  useEffect(() => {
    setCartState(state.cart)
  });
  const totalSum = cartState.reduce((accum, item) => {
    return accum + (item.qty * item.price);
  }, 0);
  return <div>
    <Paragraph color="secondary.900" fontWeight={700} mb={2}>
      Ваш заказ
    </Paragraph>

    {cartState.map(({
                       name,
                       qty,
                       price,
                       id
                     }) => <CartItem name={name} price={price} qty={qty} key={id}/>)}

    <Box component={Divider} borderColor="grey.300" my={3}/>

    {/*<ListItem title="Subtotal" value={2610} />*/}
    {/*<ListItem title="Shipping" />*/}
    {/*<ListItem title="Tax" value={40} />*/}
    {/*<ListItem title="Discount" mb={3} />*/}

    {/*<Box component={Divider} borderColor="grey.300" mb={1} />*/}

    <ListItem title="Итого" value={totalSum} color="inherit"/>
  </div>;
}
