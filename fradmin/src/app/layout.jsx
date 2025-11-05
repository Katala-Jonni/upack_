import { Open_Sans } from "next/font/google";
export const openSans = Open_Sans({
  subsets: ["latin"]
}); // THEME PROVIDER

import ThemeProvider from "theme/theme-provider"; // PRODUCT CART PROVIDER

import CartProvider from "contexts/CartContext"; // SITE SETTINGS PROVIDER

import SettingsProvider from "contexts/SettingContext"; // GLOBAL CUSTOM COMPONENTS
import GroceryTwo from './(layout-1)/grocery-2/page'
import RTL from "components/rtl";
import ProgressBar from "components/progress"; // IMPORT i18n SUPPORT FILE
import Start from '../app/(layout-2)/layout'
import GroceryTwoPageView from '../pages-sections/grocery-2/page-view/grocery-2';
import "i18n";
export default function RootLayout({
  children
}) {
  return <html lang="en" suppressHydrationWarning>
      <body className={openSans.className}>
      <CartProvider>
        <SettingsProvider>
          <ThemeProvider>
            <ProgressBar />
            {/*<RTL>{children}</RTL>*/}
            {children}
          </ThemeProvider>
        </SettingsProvider>
      </CartProvider>
      </body>
    </html>;
}
