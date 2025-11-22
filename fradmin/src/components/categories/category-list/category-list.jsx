// LOCAL CUSTOM COMPONENTS
import MegaMenu1 from "../mega-menu/mega-menu-1";
import MegaMenu2 from "../mega-menu/mega-menu-2";
import CategoryListItem from "../category-list-item"; // NAVIGATION DATA

import { categoryMenus } from "data/navigations"; // STYLED COMPONENT
import {categoryNavigation} from '../../../__server__/__db__/grocery-2/data';

import { StyledRoot } from "./styles";
import useCategories from '../../../hooks/useCategories';

export default function CategoryList({
  open,
  position = "absolute",
}) {
  const {state} = useCategories();
  return <StyledRoot open={open} position={position}>
    {state.categories?.map(item => {
      const {
        refKey,
        href,
        title,
        children,
        component,
        icon,
        offer
      } = item;
      const MegaMenu = component === MegaMenu1.name ? MegaMenu1 : MegaMenu2;
      return <CategoryListItem key={refKey} href={`/products/search/${refKey}`} icon={icon} title={title} caret={!!children} render={component ? <MegaMenu data={children} banner={offer} /> : null} />;
    })}
    {/*  {categoryNavigation.map(item => {*/}
    {/*  const {*/}
    {/*    href,*/}
    {/*    title,*/}
    {/*    children,*/}
    {/*    component,*/}
    {/*    icon,*/}
    {/*    offer*/}
    {/*  } = item;*/}
    {/*  const MegaMenu = component === MegaMenu1.name ? MegaMenu1 : MegaMenu2;*/}
    {/*  return <CategoryListItem key={title} href={href} icon={icon} title={title} caret={!!children} render={component ? <MegaMenu data={children} banner={offer} /> : null} />;*/}
    {/*})}*/}
    </StyledRoot>;
}
