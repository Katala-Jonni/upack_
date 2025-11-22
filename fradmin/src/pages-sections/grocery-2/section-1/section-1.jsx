"use client";

import useTheme from "@mui/material/styles/useTheme"; // GLOBAL CUSTOM COMPONENTS

import LazyImage from "components/LazyImage";
import { Carousel } from "components/carousel";
import { H1, H5, H6 } from "components/Typography";
import AppStore from "components/footer/components/app-store"; // CUSTOM DATA MODEL

// STYLED COMPONENTS
import { GridItemOne, GridItemTwo, StyledRoot, StyledGrid } from "./styles"; // ========================================================================
import Grid from "@mui/material/Grid";
// ========================================================================
export default function Section1({
  carouselData
}) {
  const {
    direction
  } = useTheme();
  return <StyledRoot>
  {/*return <StyledRoot className="mb-3">*/}
      <Carousel dots //autoplay
    arrows={false} spaceBetween={0} slidesToShow={1} dotColor="white" dotStyles={{
      bottom: 25,
      position: "absolute",
      ...(direction === "rtl" ? {
        right: 40
      } : {
        left: 40
      }),
    }}>
        {carouselData.map(item => <StyledGrid container key={item.id}>
          {/*<GridItemOne item md={4} sm={7} xs={12}>*/}
          {/*  <H1 maxWidth={280} mb={1} lineHeight="1.27">*/}
          {/*    {item.title}*/}
          {/*  </H1>*/}

          {/*  <H6 maxWidth={470} color="inherit" fontWeight={400} mb={5}>*/}
          {/*    {item.description}*/}
          {/*  </H6>*/}

          {/*  /!*<H5 fontSize={18} fontWeight={700} mb={2.5}>*!/*/}
          {/*  /!*  Try our mobile app!*!/*/}
          {/*  /!*</H5>*!/*/}


          {/*</GridItemOne>*/}
          <Grid item md={4} sm={5} xs={12}>
            <H1 maxWidth={280} mb={1} lineHeight="1.15">
              {item.title}
            </H1>
            <H6 maxWidth={470} color="inherit" fontWeight={400} mb={5}>
              {item.description}
            </H6>
            <AppStore url={item.link} key={item.id}/>
          </Grid>

          <Grid item md={8} sm={5} xs={12}>
            <LazyImage unoptimized width={570} height={360} src={item.imgUrl} alt={item.title} />
            {/*<LazyImage priority width={570} height={360} src={item.imgUrl} alt={item.title} />*/}
          </Grid>
        </StyledGrid>)}
        {/*{carouselData.map(item => <StyledGrid container key={item.id}>*/}
        {/*    <GridItemOne item md={7} sm={7} xs={12}>*/}
        {/*      <H1 maxWidth={280} mb={1} lineHeight="1.27">*/}
        {/*        {item.title}*/}
        {/*      </H1>*/}

        {/*      <H6 maxWidth={470} color="inherit" fontWeight={400} mb={5}>*/}
        {/*        {item.description}*/}
        {/*      </H6>*/}

        {/*      /!*<H5 fontSize={18} fontWeight={700} mb={2.5}>*!/*/}
        {/*      /!*  Try our mobile app!*!/*/}
        {/*      /!*</H5>*!/*/}

        {/*      <AppStore />*/}
        {/*    </GridItemOne>*/}

        {/*    <GridItemTwo item md={5} sm={5} xs={12}>*/}
        {/*      <LazyImage width={570} height={360} src={item.imgUrl} alt={item.title} />*/}
        {/*      /!*<LazyImage priority width={570} height={360} src={item.imgUrl} alt={item.title} />*!/*/}
        {/*    </GridItemTwo>*/}
        {/*  </StyledGrid>)}*/}
      </Carousel>
    </StyledRoot>;
}
