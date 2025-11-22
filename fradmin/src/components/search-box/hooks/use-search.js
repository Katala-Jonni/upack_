import { useEffect, useRef, useState, useTransition } from 'react';
import api from 'utils/__api__/grocery-2';
import { routes } from '../../../api/routes';
// import { getSearchProducts } from '../../../utils/__api__/grocery-2';
export default function useSearch() {
  const parentRef = useRef();
  const [_, startTransition] = useTransition();
  const [category, setCategory] = useState('*');
  const [resultList, setResultList] = useState({});
  const [categoryTitle, setCategoryTitle] = useState('All Categories'); // HANDLE CHANGE THE CATEGORY

  const handleCategoryChange = cat => () => {
    setCategory(cat.value);
    setCategoryTitle(cat.title);
  }; // FETCH PRODUCTS VIA API


  // const getProducts = async (searchText, category) => {
  //   const data = await api.searchProducts(searchText, category);
  //   setResultList(data);
  // };

  const getProducts = async (searchText, page = 1) => {
    // const data = await api.getSearchProducts(searchText, page);
    // const data = await api.searchProducts(searchText, page);
    const body = {
      search: {
        title: searchText
      }
    };
    const response = await fetch(`/api/products/search?page=${page}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const result = await response.json();
    console.log('getProductsResult', result);
    // const response = await fetch(`${routes.baseUrl}${routes.products}/search/?page=${page}`, {
    //   search: {
    //     title: searchText
    //   }
    // });
    setResultList(result);
  };

  const handleSearch = e => {
    startTransition(async () => {
      const value = e.target?.value.trim();
      if (!value) setResultList([]); else await getProducts(value);
      // if (!value) setResultList([]); else if (value && category !== '*') await getProducts(value, category); else await getProducts(value);
    });
  };

  const handleDocumentClick = () => setResultList([]);

  useEffect(() => {
    window.addEventListener('click', handleDocumentClick);
    return () => window.removeEventListener('click', handleDocumentClick);
  }, []);
  return {
    category,
    parentRef,
    resultList,
    handleSearch,
    categoryTitle,
    handleCategoryChange
  };
}
