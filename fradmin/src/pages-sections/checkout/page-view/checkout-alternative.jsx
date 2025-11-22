import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'; // LOCAL CUSTOM COMPONENTS

import { CheckoutForm } from '../checkout-alt-form';
import { CheckoutAltSummery } from '../checkout-alt-summery';
import { Paragraph } from '../../../components/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import React from 'react';
// import useCart from '../../../hooks/useCart';

export default function CheckoutAlternativePageView() {

  // const {
  //   state
  // } = useCart();
  // if (!state.cart || !state.cart.length) {
  //   return <Container sx={{
  //     my: '1.5rem'
  //   }}>
  //     <Grid container spacing={3}>
  //       <Grid item lg={8} md={8} xs={12}>
  //         <Paragraph>Ваша корзина пуста</Paragraph>
  //       </Grid>
  //
  //       <Grid item lg={4} md={4} xs={12}>
  //         <Button color="primary" href="/" variant="contained" LinkComponent={Link}>
  //           Перейти к каталогу
  //         </Button>
  //       </Grid>
  //     </Grid>
  //   </Container>;
  // }


  return <Container sx={{
    my: '1.5rem'
  }}>
    <Grid container spacing={3}>
      <Grid item lg={8} md={8} xs={12}>
        <CheckoutForm/>
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <CheckoutAltSummery/>
      </Grid>
    </Grid>
  </Container>;
}
