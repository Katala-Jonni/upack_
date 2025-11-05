import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENTS

import { H3 } from "components/Typography";
import { Carousel } from "components/carousel";
import ProductCard1 from "components/product-cards/product-card-1";
import ProductCard2 from '../../components/product-cards/product-card-2/product-card'; // CUSTOM DATA MODEL

// =======================================================
export default function ProductCarousel({
  products,
  title
}) {
  const responsive = [{
    breakpoint: 1440,
    settings: {
      slidesToShow: 5
    }
  },{
    breakpoint: 1200,
    settings: {
      slidesToShow: 4
    }
  }, {
    breakpoint: 950,
    settings: {
      slidesToShow: 3
    }
  }, {
      breakpoint: 750,
      settings: {
        slidesToShow: 2
      }
    },
    {
    breakpoint: 500,
    settings: {
      slidesToShow: 1
    }
  }];

  const settings = {
    // dots: true,
    arrows: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    // autoplay: true,
    // speed: 2000,
    // autoplaySpeed: 3000,
    cssEase: "linear",
    swipeToSlide: true
  };
  return <div className="mb-3">
      <H3 fontSize={25} mb={3}>
        {title}
      </H3>

      <Carousel slidesToShow={4} responsive={responsive} {...settings}>
        {products.map(item => <Box py={0.5} key={item.id}>
            <ProductCard1
              hideRating
              id={item.id}
              slug={item.slug}
              price={item.price}
              title={item.title}
              rating={item.rating}
              imgUrl={item.thumbnail}
              discount={item.discount}
            />
          </Box>)}
      </Carousel>
    </div>;
}
