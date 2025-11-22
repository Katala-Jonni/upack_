import { useContext } from 'react';
import { CategoriesContext } from 'contexts/CategoriesContext';

const useCategories = () => useContext(CategoriesContext);

export default useCategories;
