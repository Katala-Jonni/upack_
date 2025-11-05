import Box from "@mui/material/Box"; // GLOBAL CUSTOM COMPONENTS

import { H3 } from "components/Typography";
import { Carousel } from "components/carousel";
import ProductCard1 from "components/product-cards/product-card-1";
import ProductCard2 from '../../components/product-cards/product-card-2/product-card';
import PartnerCard1 from '../../components/partner-cards/partner-card-1/partner-card';
import PartnerCard2 from '../../components/partner-cards/partner-card-2/partnert-card'; // CUSTOM DATA MODEL

// =======================================================
export default function PartnerCarousel({
  products,
  title
}) {
  const responsive = [{
    breakpoint: 1440,
    settings: {
      slidesToShow: 4
    }
  }, {
    breakpoint: 950,
    settings: {
      slidesToShow: 2
    }
  }, {
    breakpoint: 500,
    settings: {
      slidesToShow: 1
    }
  }];
  const settings = {
    // dots: true,
    infinite: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    swipeToSlide: true
  };
  return <div className="mb-3">
      <H3 fontSize={25} mb={3}>
        {title}
      </H3>

      <Carousel slidesToShow={6} responsive={responsive} {...settings}>
        {products.map(item => <Box py={0.5} key={item.id}>
            <PartnerCard2 hideRating id={item.id} slug={item.slug} price={item.price} title={item.title} rating={item.rating} imgUrl={item.thumbnail} discount={item.discount} />
          </Box>)}
      </Carousel>
    </div>;
}
