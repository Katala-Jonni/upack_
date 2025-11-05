import { notFound } from "next/navigation"; // PAGE VIEW COMPONENT

import { ProductDetailsPageView } from "pages-sections/product-details/page-view"; // API FUNCTIONS

// import api from "utils/__api__/products";
import { getFrequentlyBought, getRelatedProducts } from "utils/__api__/related-products";
import api from '../../../../utils/__api__/grocery-2';
export const metadata = {
  title: "Product Details - Bazaar Next.js E-commerce Template",
  description: `Bazaar is a React Next.js E-commerce template. Build SEO friendly Online store, delivery app and Multi vendor store`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
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
