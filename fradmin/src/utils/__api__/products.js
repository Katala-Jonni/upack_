import { cache } from 'react';
import axios from '../../utils/axiosInstance';
import { routes } from '../../api/routes';
import { getSearchProducts } from './grocery-2';
import { fetchApi } from '../../api/fetch';
// get all product slug
const getSlugs = cache(async () => {
  const response = await axios.get('/api/products/slug-list');
  return response.data;
}); // get product based on slug

const getProduct = cache(async slug => {
  const response = await axios.get('/api/products/slug', {
    params: {
      slug
    }
  });
  return response.data;
}); // search products


const searchProducts = cache(async (title, page = 1) => {
  const response = await fetch(`${routes.baseUrl}${routes.products}/search/?page=${page}`, {
    search: {
      title
    }
  });

  try {
    // const response = await axios.get(`api/products/search?page=${page}`, {
    // const response = await startLoadCategory(`products/search?page=${page}`, {
    // const res = getSearchProducts(title, page);
    // const response = await getSearchProducts('/api/products/search?page=1', {
    //   search: {
    //     title
    //   }
    // });
  } catch (e) {
    console.log(e);
  }

  // const response = await axios.get(`${routes.baseUrl}${routes.products}/search/?page=${page}`, {
  //   search: {
  //     title
  //   }
  // });
  return [];
  // return response.data;
});

// const searchProducts = cache(async (name, category) => {
//   const response = await axios.get("/api/products/search", {
//     params: {
//       name,
//       category
//     }
//   });
//   return response.data;
// });
export default {
  getSlugs,
  getProduct,
  searchProducts
};
