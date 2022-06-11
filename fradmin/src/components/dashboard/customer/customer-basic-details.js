import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardHeader, Divider, useMediaQuery } from '@mui/material';
import { PropertyList } from '../../property-list';
import { PropertyListItem } from '../../property-list-item';

export const CustomerBasicDetails = (props) => {
  const { surname, name, secondName, email, isVerified, phone, ...other } = props;
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const fullName = `${surname ? surname : ' '} ${name ? name : ' '} ${secondName ? secondName : ' '}`;
  const align = mdUp ? 'horizontal' : 'vertical';
  return (
    <Card {...other}>
      <CardHeader title="Основная информация"/>
      <Divider/>
      <PropertyList>
        <PropertyListItem
          align={align}
          divider
          label="Полное имя"
          value={fullName.trim()}
        />
        <PropertyListItem
          align={align}
          divider
          label="Email"
          value={email}
        />
        <PropertyListItem
          align={align}
          divider
          label="Phone"
          value={phone}
        />
      </PropertyList>
      {/*<CardActions*/}
      {/*  sx={{*/}
      {/*    flexWrap: 'wrap',*/}
      {/*    px: 3,*/}
      {/*    py: 2,*/}
      {/*    m: -1*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Button*/}
      {/*    sx={{ m: 1 }}*/}
      {/*    variant="outlined"*/}
      {/*  >*/}
      {/*    Reset &amp; Send Password*/}
      {/*  </Button>*/}
      {/*  <Button sx={{ m: 1 }}>*/}
      {/*    Login as Customer*/}
      {/*  </Button>*/}
      {/*</CardActions>*/}
    </Card>
  );
};

CustomerBasicDetails.propTypes = {
  address1: PropTypes.string,
  address2: PropTypes.string,
  country: PropTypes.string,
  email: PropTypes.string.isRequired,
  isVerified: PropTypes.bool.isRequired,
  phone: PropTypes.string,
  state: PropTypes.string
};
