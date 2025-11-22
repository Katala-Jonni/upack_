'use client';

import { Fragment, useCallback, useEffect, useState } from 'react'; // GLOBAL CUSTOM COMPONENTS

import Sticky from 'components/sticky';
import Topbar from 'components/topbar';
import { Navbar } from 'components/navbar';
import { Footer1 } from 'components/footer';
import Header from 'components/header/header';
import { SearchInputWithCategory } from 'components/search-box';
import { MobileNavigationBar } from 'components/mobile-navigation';
import SearchInput from '../../search-box/search-input';
import MobileNavigationBar2 from '../../mobile-navigation/mobile-navigation-bar-2';
import Scrollbar from '../../scrollbar';
// import GrocerySideNav from '../../page-sidenav/grocery-side-nav';
import GrocerySideNav from 'components/page-sidenav/grocery-side-nav';
import { categoryNavigation } from '../../../__server__/__db__/grocery-2/data';
import useCategories from '../../../hooks/useCategories';
// import api from '../../../utils/__api__/grocery-2';
// import { categories } from '../../../__server__/__db__/grocery-2/data';
/**
 *  USED IN:
 *  1. MARKET-1, MARKET-2, GADGET, FASHION-1, FASHION-2, FASHION-3, FURNITURE, GROCERY-3, GIFT
 *  2. PRODUCT DETAILS, PRODUCT-SEARCH, ORDER-CONFIRMATION
 *  5. SHOPS, SHOP-DETAILS
 */
const SideNav = <GrocerySideNav navigation={categoryNavigation}/>;
export default function ShopLayout1({ children }) {

  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback(fixed => setIsFixed(fixed), []);
  const [open, setOpen] = useState(false);
  const {state} = useCategories();
  const handleDrawerClose = () => setOpen(false);
  const handleDrawerToggle = () => setOpen(state => !state);

  // useEffect(async () => {
  //   const categories = await api.getCategories();
  // });
  // const navigationList = await api.getNavigationList();
  // const SideNav = <GrocerySideNav navigation={navigationList}/>;
  return <Fragment>
    {
      /* TOP BAR SECTION */
    }
    {/*<Topbar />*/}

    {
      /* HEADER */
    }
    <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
      {/*<Header isFixed={isFixed} midSlot={<SearchInputWithCategory />} />*/}
      <Header isFixed={isFixed} midSlot={<SearchInput/>}/>
    </Sticky>

    {
      /* NAVIGATION BAR */
    }
    {/*<Navbar elevation={0} border={1} />*/}

    {
      /* BODY CONTENT */
    }
    {children}

    {
      /* SMALL DEVICE BOTTOM NAVIGATION */
    }
    {/*<MobileNavigationBar2>*/}
    {/*<Scrollbar>{SideNav}</Scrollbar>*/}
    {/*</MobileNavigationBar2>*/}
    <MobileNavigationBar
      open={open}
      setOpen={setOpen}
      handleDrawerClose={handleDrawerClose}
      handleDrawerToggle={handleDrawerToggle}>
      <Scrollbar>
        <GrocerySideNav handleDrawerClose={handleDrawerClose} navigation={state.categories}/>
      </Scrollbar>
    </MobileNavigationBar>

    {
      /* FOOTER */
    }
    <Footer1/>
  </Fragment>;
}
