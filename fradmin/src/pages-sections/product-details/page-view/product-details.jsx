import Container from '@mui/material/Container'; // Local CUSTOM COMPONENTS

import ProductTabs from '../product-tabs';
import ProductIntro from '../product-intro';
import AvailableShops from '../available-shops';
import RelatedProducts from '../related-products';
import FrequentlyBought from '../frequently-bought';
import ProductDescription from '../product-description';
import Box from '@mui/material/Box'; // CUSTOM DATA MODEL

// ==============================================================
export default function ProductDetailsPageView(props) {
  return <Container className="mt-2 mb-2">
    {
      /* PRODUCT DETAILS INFO AREA */
    }
    <ProductIntro product={props.product}/>

    {
      /* PRODUCT DESCRIPTION AND REVIEW */
    }
    {/*<ProductTabs/>*/}
    <Box mb={6}>
      <ProductDescription product={props.product}/>
    </Box>

    {
      /* FREQUENTLY BOUGHT PRODUCTS AREA */
    }
    {/*<FrequentlyBought products={props.frequentlyBought}/>*/}

    {
      /* AVAILABLE SHOPS AREA */
    }
    {/*<AvailableShops />*/}

    {
      /* RELATED PRODUCTS AREA */
    }
    <RelatedProducts title={'Вместе с этим товаром покупают'} products={props.relatedProducts}/>
  </Container>;
}
