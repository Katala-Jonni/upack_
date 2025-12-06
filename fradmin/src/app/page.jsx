import IndexPageView from "pages-sections/landing/page-view";
import GroceryTwoPageView from '../pages-sections/grocery-2/page-view/grocery-2';
import ShopLayout2 from '../components/layouts/shop-layout-2';
import ShopLayout1 from '../components/layouts/shop-layout-1';
import api from '../utils/__api__/grocery-2';
export const metadata = {
  title: "ЮПАК Петрозаводск",
  description: `ЮПАК Петрозаводск Карелия - оптовые продажи для направлений медицина, бьюти сфера, общепит. Одноразовая посуда, хоз товары, пакеты, перчатки в Петрозаводске`,
  authors: [{
    name: "KJ",
    url: "https://upack-10.ru/"
  }],
  keywords: ["хоз товары", "пакеты", "перчатки", "юпак Петрозаводск"]
  // keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function IndexPage() {
  // return <GroceryTwoPageView />;
  // return <IndexPageView />;
  return <ShopLayout1>
    <GroceryTwoPageView/>
  </ShopLayout1>
}
