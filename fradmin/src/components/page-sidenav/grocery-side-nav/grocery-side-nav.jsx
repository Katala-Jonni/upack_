// GLOBAL CUSTOM COMPONENTS
import Scrollbar from 'components/scrollbar';
import { NavLink } from 'components/nav-link'; // LOCAL CUSTOM COMPONENTS

import ListItem from './components/list-item';
import NavAccordion from './components/nav-accordion'; // STYLED COMPONENTS

import { StyledCard } from './styles';
import { routes } from '../../../api/routes'; // CUSTOM DATA MODEL

// ===========================================================
export default function GrocerySideNav({
                                         navigation, handleDrawerClose
                                       }) {
  return <Scrollbar>
    <StyledCard elevation={3}>
      {navigation.map((item, ind) => {
        // if (item.child) return <NavAccordion item={item} key={item.refKey} />;
        return <NavLink key={item.refKey} href={`${routes.currentCategories}/${item.refKey}`} color="grey.700" onClick={handleDrawerClose}>
          <ListItem title={item.title}/>
          {/*<ListItem title={item.title} icon={item.icon} />*/}
        </NavLink>;
      })}
    </StyledCard>
  </Scrollbar>;
}
