'use client';

import { useState } from 'react';
import Box from '@mui/material/Box'; // CUSTOM COMPONENTS

import Footer from '../footer';
import Section3 from '../section-3';
import Setting from 'components/settings';
import GroceryTwoPageView from '../../grocery-2/page-view/grocery-2';

export default function IndexPageView() {
  const [filterDemo, setFilterDemo] = useState('');

  const handleChangeFilter = value => setFilterDemo(value);

  return <Box id="top" overflow="hidden" bgcolor="background.paper">
    {/*<Section1 />*/}
    {/*<Section6 handleChangeFilter={handleChangeFilter} />*/}
    {/*<Section2 />*/}
    {/*<Section5 />*/}
    <Section3 filterDemo={filterDemo} setFilterDemo={handleChangeFilter} />
    {/*<GroceryTwoPageView/>*/}
    {/*<GroceryTwoPageView/>*/}
    {/*<Section4 />*/}
    {/*<Footer />*/}
    {/*<Setting />*/}
  </Box>;
}
