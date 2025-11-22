import IndexPageView from "pages-sections/landing/page-view";
import GroceryTwoPageView from '../pages-sections/grocery-2/page-view/grocery-2';
import ShopLayout2 from '../components/layouts/shop-layout-2';
import ShopLayout1 from '../components/layouts/shop-layout-1';
import api from '../utils/__api__/grocery-2';
export const metadata = {
  title: "Bazaar - Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function IndexPage() {
  // return <GroceryTwoPageView />;
  // return <IndexPageView />;
  return <ShopLayout1>
    <GroceryTwoPageView/>
  </ShopLayout1>
}
