import { notFound } from "next/navigation"; // PAGE VIEW COMPONENT

import { ProductDetailsPageView } from "pages-sections/product-details/page-view"; // API FUNCTIONS

// import api from "utils/__api__/products";
import { getFrequentlyBought, getRelatedProducts } from "utils/__api__/related-products";
import api from '../../../../utils/__api__/grocery-2';
export const metadata = {
  title: "ЮПАК Петрозаводск",
  description: `ЮПАК Петрозаводск Карелия - оптовые продажи для направлений медицина, бьюти сфера, общепит. Одноразовая посуда, хоз товары, пакеты, перчатки в Петрозаводске`,
  authors: [{
    name: "KJ",
    url: "https://upack-10.ru/"
  }],
  keywords: ["хоз товары", "пакеты", "перчатки", "юпак Петрозаводск"]
};
export default async function ProductDetails({
  params
}) {
  try {
    // const product = await api.getProduct(params.slug);
    const product = await api.getProductsId(params.slug);
    const images = await api.getImagesBase64();
    console.log('images', images);
    const relatedProducts = await getRelatedProducts();
    const frequentlyBought = await getFrequentlyBought();
    const str = `data:image/jpg;base64, ${images}`;
    // return <img src={str} alt="Изображение" />
    return <ProductDetailsPageView product={product} relatedProducts={relatedProducts} frequentlyBought={frequentlyBought} />;
  } catch (error) {
    console.log('error', error);
    notFound();
  }
}
