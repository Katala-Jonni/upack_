import Link from 'next/link';
import { Fragment, useEffect } from 'react';
import useTheme from '@mui/material/styles/useTheme';
import useMediaQuery from '@mui/material/useMediaQuery';
import clsx from 'clsx'; // LOCAL CUSTOM HOOKS

import useHeader from './hooks/use-header'; // GLOBAL CUSTOM COMPONENTS

import LazyImage from 'components/LazyImage';
import FlexBox from 'components/flex-box/flex-box'; // LOCAL CUSTOM COMPONENTS

import MobileHeader from './components/mobile-header';
import DialogDrawer from './components/dialog-drawer';
import CategoriesMenu from './components/categories-menu';
import LoginCartButtons from './components/login-cart-buttons'; // STYLED COMPONENTS

import { HeaderWrapper, StyledContainer } from './styles';
import { routes } from '../../api/routes';
import useCategories from '../../hooks/useCategories';

// ==============================================================
export default function Header({
                                 isFixed,
                                 className,
                                 midSlot,
                                 categories
                               }) {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  const {
    dialogOpen,
    sidenavOpen,
    toggleDialog,
    toggleSidenav,
    toggleSidenavClickBtnMiniCart
  } = useHeader();

  const {
    state,
    dispatch
  } = useCategories();

  useEffect(() => {
    const url = `/api${routes.rootCategories}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        const result = await response.json();
        dispatch({
          type: 'LOAD_CATEGORIES_AMOUNT',
          payload: {
            categories: result.categories
          }
        });
      } catch (error) {
        console.log('Header', error);
      }
    };

    fetchData();
  }, []);

  const CONTENT_FOR_LARGE_DEVICE = <Fragment>
    {
      /* LEFT CONTENT - LOGO AND CATEGORY */
    }
    <FlexBox minWidth={100} alignItems="center">
      <Link href="/">
        <img src='/assets/images/logo-main.svg' alt="ЮПАК-27-02-08" width='80px' height='58px' title="ЮПАК-27-02-08" style={{
          cursor: 'pointer'
        }}/>
        {/*<LazyImage src={require('../../../public/assets/images/logo-main.svg')} alt="ЮПАК-27-02-08" width='105px' height='50px'/>*/}
      </Link>

      {
        /* SHOW DROP DOWN CATEGORY BUTTON WHEN HEADER FIXED */
      }
      <CategoriesMenu/>
      {/*{isFixed ? <CategoriesMenu /> : null}*/}
    </FlexBox>

    {
      /* SEARCH FORM | NAVIGATION */
    }
    {midSlot}

    {
      /* LOGIN AND CART BUTTON */
    }
    <LoginCartButtons toggleDialog={toggleDialog} toggleSidenav={toggleSidenav}/>

    {
      /* LOGIN FORM DIALOG AND CART SIDE BAR  */
    }
    <DialogDrawer
      dialogOpen={dialogOpen}
      sidenavOpen={sidenavOpen}
      toggleDialog={toggleDialog}
      toggleSidenav={toggleSidenav}
      toggleSidenavClickBtnMiniCart={toggleSidenavClickBtnMiniCart}
    />
  </Fragment>;
  return <HeaderWrapper className={clsx(className)}>
    <StyledContainer>{downMd ? <MobileHeader/> : CONTENT_FOR_LARGE_DEVICE}</StyledContainer>
  </HeaderWrapper>;
}
