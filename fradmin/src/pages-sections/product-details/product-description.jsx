"use client";

import { H3 } from "components/Typography";
export default function ProductDescription({product}) {
  return <div>
      <H3 mb={2}>Описание:</H3>
      <div>
        {product.title}<br />
       {product.comment}
      </div>
    </div>;
}
