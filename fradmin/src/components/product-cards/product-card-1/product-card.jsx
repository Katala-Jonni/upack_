'use client';

import Link from 'next/link';
import Image from 'next/image';
import Box from '@mui/material/Box';

import Rating from '@mui/material/Rating'; // GLOBAL CUSTOM COMPONENTS

import LazyImage from 'components/LazyImage';
import { Span } from 'components/Typography';
import ProductViewDialog from 'components/products-view/product-view-dialog'; // LOCAL CUSTOM HOOK

import useProduct from '../use-product'; // LOCAL CUSTOM COMPONENTS

import HoverActions from './components/hover-actions';
import ProductPrice from '../product-price';
import ProductTitle from '../product-title';
import DiscountChip from '../discount-chip';
import QuantityButtons from './components/quantity-buttons'; // STYLED COMPONENTS

import { ImageWrapper, ContentWrapper, StyledBazaarCard } from './styles';
import { useState, useRef, useEffect } from 'react'; // ========================================================

// ========================================================

// function MyComponent( {id,
//                       slug,
//                       title,
//                       price,
//                       imgUrl}) {
//   const [imageSrc, setImageSrc] = useState('');
//   const imageUrl = "https://example.com/path/to/your/image.jpg";
//
//   useEffect(() => {
//     fetch(imageUrl).then(() => {
//       setImageSrc(imageUrl);
//     });
//   }, [imageUrl]);
//
//   return <Image fill src={imgUrl} alt={title} style={{ objectFit: 'contain' }} onClick={toggleDialog}/>
// }

export default function ProductCard1({
                                       id,
                                       slug,
                                       title,
                                       price,
                                       imgUrl,
                                       comment,
                                       count,
                                       rating = 5,
                                       hideRating,
                                       hoverEffect,
                                       discount = 5,
                                       showProductSize
                                     }) {
  const {
    isFavorite,
    openModal,
    cartItem,
    toggleDialog,
    toggleFavorite,
    handleCartAmountChange
  } = useProduct(slug);

  // const [isLoading, setLoading] = useState(true);
  // const imgRef = useRef(null);
  //
  // useEffect(() => {
  //   console.log('isLoading', imgRef.current);
  //   setLoading(false);
  // });

  // console.log('renderProductCard1', price, count);


  const handleIncrementQuantity = () => {
    const product = {
      id,
      slug,
      price,
      imgUrl,
      name: title,
      qty: (cartItem?.qty || 0) + count,
      count
    };
    handleCartAmountChange(product);
  };

  const handleDecrementQuantity = () => {
    const product = {
      id,
      slug,
      price,
      imgUrl,
      name: title,
      qty: (cartItem?.qty || 0) - count,
      count
    };
    handleCartAmountChange(product, 'remove');
  };

  return <StyledBazaarCard hoverEffect={hoverEffect}>
    <ImageWrapper>
      {
        /* DISCOUNT PERCENT CHIP IF AVAILABLE */
      }
      {/*<DiscountChip discount={discount} />*/}

      {
        /* HOVER ACTION ICONS */
      }
      <HoverActions isFavorite={isFavorite} toggleView={toggleDialog} toggleFavorite={toggleFavorite}/>

      {
        /* PRODUCT IMAGE / THUMBNAIL */
      }
      {/*<Link href={`/products/${slug}`} >*/}
      {/*<LazyImage priority src={imgUrl} width={500} height={500} alt={title}/>*/}
      {/*<Image src={dimensions.src} width={dimensions.width} height={dimensions.height} alt={title} onLoad={handleImageLoad}/>*/}
      <Image fill src={imgUrl} alt={title} style={{ objectFit: 'contain' }} onClick={toggleDialog} loading={'lazy'}/>
      {/*<img src={imgUrl} width={200} height={200} alt={title}/>*/}
      {/*</Link>*/}
    </ImageWrapper>

    {
      /* PRODUCT VIEW DIALOG BOX */
    }
    <ProductViewDialog openDialog={openModal} handleCloseDialog={toggleDialog} product={{
      title,
      price,
      count,
      id,
      slug,
      comment,
      imgGroup: [imgUrl, imgUrl]
    }}/>

    <ContentWrapper>
      <Box flex="1 1 0" minWidth="0px" mr={1}>
        {
          /* PRODUCT NAME / TITLE */
        }
        <ProductTitle title={title} slug={slug}/>

        {
          /* PRODUCT RATINGS IF AVAILABLE */
        }
        {/*{!hideRating ? <Rating size="small" value={rating} color="warn" readOnly /> : null}*/}

        {
          /* PRODUCT SIZE IF AVAILABLE */
        }
        {showProductSize ? <Span color="grey.600" mb={1} display="block">
          Liter
        </Span> : null}

        {
          /* PRODUCT PRICE WITH DISCOUNT */
        }
        {/*<ProductPrice discount={discount} price={price} />*/}
        <ProductPrice discount={0} price={price} count={count}/>
      </Box>

      {
        /* PRODUCT QUANTITY HANDLER BUTTONS */
      }
      <QuantityButtons quantity={cartItem?.qty || 0} handleIncrement={handleIncrementQuantity}
                       handleDecrement={handleDecrementQuantity}/>
    </ContentWrapper>
  </StyledBazaarCard>;
}
