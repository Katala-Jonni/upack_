import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'; // LOCAL CUSTOM HOOKS

import useSearch from './hooks/use-search'; // LOCAL CUSTOM COMPONENT

import SearchResult from './components/search-result'; // STYLED COMPONENT

import { SearchOutlinedIcon } from './styles';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const LinkComponent = (searchPath) => {
  const router = useRouter();

  const handleLinkClick = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение Link
    if (searchPath?.length < 3) return;
    router.push(`/products/search/?title=${searchPath}`);
    router.refresh(); // Принудительно перезагружаем страницу после перехода
  };

  // if (searchPath?.length <= 3){
    return <Button color="primary" onClick={handleLinkClick} disableElevation variant="contained" sx={{
      px: '3rem',
      height: '100%',
      borderRadius: '0 4px 4px 0'
    }}>
      Найти
    </Button>
  // } else {
    // return <Link onClick={handleLinkClick} href={`/products/search/?title=${searchPath}`} sx={{
    //   px: '3rem',
    //   height: '100%',
    //   borderRadius: '0 4px 4px 0'
    // }}><Button color="primary" disableElevation variant="contained">
    //   Найти
    // </Button></Link>;
  // }

  // return <Button color="primary" disableElevation variant="contained" onClick={() => router.push(`/products/search/?title=${searchPath}`)} sx={{
  //   px: '3rem',
  //   height: '100%',
  //   borderRadius: '0 4px 4px 0'
  // }}>
  //   Найти
  // </Button>


  // return <a href={`/products/search/?title=${searchPath}`} sx={{
  //   px: '3rem',
  //   height: '100%',
  //   borderRadius: '0 4px 4px 0'
  // }}><Button color="primary" disableElevation variant="contained">
  //   Найти
  // </Button></a>;

};

export default function SearchInput() {
  const {
    handleSearch,
    parentRef,
    resultList
  } = useSearch();

  const [searchPath, setSearchPath] = useState('');

  const handleChange = (e) => {
    setSearchPath(e.target?.value.trim());
  };

  // const [listSearch, setListSearch] = useState([]);

  // useEffect(() => {
  //   setListSearch(resultList?.products || []);
  // });
  //
  // console.log('listSearch', listSearch);
  // console.log('resultList', resultList);


  const INPUT_PROPS = {
    sx: {
      border: 0,
      height: 44,
      paddingRight: 0,
      overflow: 'hidden',
      backgroundColor: 'grey.200',
      '& .MuiOutlinedInput-notchedOutline': {
        border: 0
      }
    },
    endAdornment: LinkComponent(searchPath),
    startAdornment: <SearchOutlinedIcon fontSize="small"/>
  };
  return <Box position="relative" flex="1 1 0" maxWidth="670px" mx="auto" {...{
    ref: parentRef
  }}>
    <TextField fullWidth variant="outlined" value={searchPath} placeholder="Найти товар, мининиму 5 символов"
               onChange={handleChange} InputProps={INPUT_PROPS}/>
    {/*<TextField fullWidth variant="outlined" placeholder="Найти товар" onChange={handleSearch} InputProps={INPUT_PROPS}/>*/}

    {
      /* SHOW SEARCH RESULT LIST */
    }
    {/*{resultList.products?.length > 0 ? <SearchResult results={resultList.products}/> : null}*/}
    {/*{resultList.length > 0 ? <SearchResult results={resultList}/> : null}*/}
  </Box>;
}
