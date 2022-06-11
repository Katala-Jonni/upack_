// import React, { useEffect } from 'react';
// import Head from 'next/head';
// import { MainLayout } from '../components/main-layout';
// import { gtm } from '../lib/gtm';
// // import { AuthGuard } from '../components/authentication/auth-guard';
// import { GuestGuard } from '../components/authentication/guest-guard';
//
// const Home = () => {
//   useEffect(() => {
//     gtm.push({ event: 'page_view' });
//   }, []);
//
//   return (
//     <Head>
//       <title>
//         Главная Food-service
//       </title>
//     </Head>
//   );
// };
//
// Home.getLayout = (page) => (
//   <GuestGuard>
//     <MainLayout>
//       {page}
//     </MainLayout>
//   </GuestGuard>
// );
//
// export default Home;

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Card, Container, Typography } from '@mui/material';
import { MainLayout } from '../components/main-layout';
import { gtm } from '../lib/gtm';
import { GuestGuard } from '../components/authentication/guest-guard';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Logo } from '../components/logo';
import { Auth } from '../components/authentication/auth';

const Home = () => {
  const router = useRouter();
  const mapTitle = {
    0: 'Вход',
    1: 'Регистрация'
  };

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
  }, [value]);

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
      mt={2}
    >
      <Box
        style={{
          width: '600px'
        }}
      >
        {/*<Box*/}
        {/*  style={{*/}
        {/*    paddingLeft: 24,*/}
        {/*    paddingRight: 24*/}
        {/*  }}>*/}
        {/*  <Tabs*/}
        {/*    value={value}*/}
        {/*    onChange={handleChange}*/}
        {/*    aria-label="basic tabs example"*/}
        {/*    centered*/}
        {/*  >*/}
        {/*    <Tab label="Вход" style={{ width: '47%' }}/>*/}
        {/*    <Tab label="Регистрация" style={{ width: '47%' }}/>*/}
        {/*  </Tabs>*/}
        {/*</Box>*/}
        <>
          <Head>
            <title>
              {value === 0 ? 'Авторизация' : 'Регистрация'}
            </title>
          </Head>
          <Box
            component="main"
            sx={{
              backgroundColor: 'background.default',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Container maxWidth="sm">
              <Card
                elevation={16}
                sx={{ p: 4 }}
              >
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <NextLink
                    href={'/'}
                    // href={asPath}
                    passHref
                  >
                    <a>
                      <Logo
                        sx={{
                          height: 40,
                          width: 40
                        }}
                      />
                    </a>
                  </NextLink>
                  <Typography variant="h4">
                    {mapTitle[value]}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    flexGrow: 1,
                    mt: 3
                  }}
                >
                  <Auth value={value}/>
                </Box>
              </Card>
            </Container>
          </Box>
        </>
      </Box>
    </Box>
  );
};

Home.getLayout = (page) => (
  <GuestGuard>
    <MainLayout>
      {page}
    </MainLayout>
  </GuestGuard>
);

export default Home;

