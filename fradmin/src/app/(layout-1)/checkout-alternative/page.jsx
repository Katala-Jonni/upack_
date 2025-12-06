import { CheckoutAlternativePageView } from "pages-sections/checkout/page-view";
export const metadata = {
  title: "Корзина покупателя - ЮПАК Петрозаводск",
  description: `ЮПАК Петрозаводск Карелия - оптовые продажи для направлений медицина, бьюти сфера, общепит. Одноразовая посуда, хоз товары, пакеты, перчатки в Петрозаводске`,
  authors: [{
    name: "KJ",
    url: "https://upack-10.ru/"
  }],
  keywords: ["хоз товары", "пакеты", "перчатки", "юпак Петрозаводск"]
};
export default async function CheckoutAlternative() {
  return <CheckoutAlternativePageView />;
}
