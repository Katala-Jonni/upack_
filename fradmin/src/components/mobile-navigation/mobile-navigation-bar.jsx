"use client";

import Badge from "@mui/material/Badge";
import useMediaQuery from "@mui/material/useMediaQuery"; // CUSTOM ICON COMPONENTS

import Home from "icons/Home";
import User2 from "icons/User2";
import CategoryOutlined from "icons/CategoryOutline";
import ShoppingBagOutlined from "icons/ShoppingBagOutlined"; // GLOBAL CUSTOM HOOK

import useCart from "hooks/useCart"; // STYLED COMPONENTS

import { iconStyle, StyledBox, StyledDrawer, StyledNavLink, Wrapper } from './styles';
import { Fragment, useState } from 'react';
export default function MobileNavigationBar({children}) {
  const {
    state
  } = useCart();
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => setOpen(state => !state);
  const handleDrawerClose = () => setOpen(false);
  const DOWN_900 = useMediaQuery(theme => theme.breakpoints.down(900));

  if (DOWN_900) {
    return <Wrapper>
      <StyledDrawer open={open} anchor="left" onClose={handleDrawerClose}>
        {children}
      </StyledDrawer>
        {list.map(({
        Icon,
        href,
        title
      }) => {
          const ICON = <Icon sx={iconStyle} fontSize="small" />;
          const CONTENT = <Fragment>
            {title === "Cart" ? <Badge badgeContent={state.cart.length} color="primary">
              {ICON}
            </Badge> : ICON}

            {title}
          </Fragment>;
          return href ? <StyledNavLink href={href} key={title}>
              {title === "Cart" ? <Badge badgeContent={state.cart.length} color="primary">
                <Icon fontSize="small" sx={iconStyle} />
              </Badge> : <Icon sx={iconStyle} fontSize="small" />}

              {title}
            </StyledNavLink>
            : <StyledBox key={title} onClick={handleDrawerToggle}>
              {CONTENT}
            </StyledBox>
        })}
      </Wrapper>;
  }

  return null;
}
const list = [{
  title: "Главная",
  Icon: Home,
  href: "/"
}, {
  title: "Категории",
  Icon: CategoryOutlined,
  // href: "/mobile-category-nav"
}, {
  title: "Корзина",
  Icon: ShoppingBagOutlined,
  href: "/cart"
}, {
  title: "Профиль",
  Icon: User2,
  href: "/profile"
}];
