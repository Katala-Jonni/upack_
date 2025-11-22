import Button from '@mui/material/Button'; // MUI ICON COMPONENT
import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from '@mui/material/styles';

import Category from 'icons/Category'; // GLOBAL CUSTOM COMPONENTS
import { FlexBox } from 'components/flex-box';
import CategoryMenu from 'components/categories/category-menu';


const catalogBase = '#2B3445';
const catalogMain = alpha(catalogBase, 1);

const theme = createTheme({
  palette: {
    catalogBase: {
      main: catalogMain,
      light: alpha(catalogBase, 0.5),
      dark: alpha(catalogBase, 0.9),
      contrastText: getContrastRatio(catalogMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});

export default function CategoriesMenu() {
  return <CategoryMenu
    render={handler =>
      <ThemeProvider theme={theme}><FlexBox color="grey.600" alignItems="center" ml={2}>
      <Button color='catalogBase' onClick={e => handler(e)} variant="contained" startIcon={<Category fontSize="small" color="inherit"/>}>
        Каталог
      </Button>
    </FlexBox></ThemeProvider>}
  />;
}
