"use client";

import { useCart } from "@/context/CartContext";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";
import {  useState } from "react";

type TVariant = {
  id: string;
  sku: string;
  price: number;
  quantity: number;
  size: string;
};
type TProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  costPrice?: number;
  weight?: number;
  images: string;
  variants: TVariant[];
};

const ProductCard = ({ product }: { product: TProduct }) => {
  const { addToCart, effectiveCart } = useCart()
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null)

  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId
  )

  const cartItem = effectiveCart.find(
    (item) => item.variantId === selectedVariantId
  )

  const cartQuantity = cartItem?.quantity ?? 0
  const maxStock = selectedVariant?.quantity ?? 0

  const isMaxReached = cartQuantity >= maxStock && maxStock > 0

  return (
    <Grid key={product.id} size={{ xs: 6, md: 4 }}>
    <Card>
      <Image src={product.images} alt={product.name} width={100} height={100} />

      <CardContent>
        <Typography variant="h6">BDT {product.basePrice}</Typography>
        <Typography variant="h5">{product.name}</Typography>
      </CardContent>

      {product.variants.map((variant) => (
        <Button
          key={variant.id}
          type="button"
          onClick={() => setSelectedVariantId(variant.id)}
          style={{
            border:
              selectedVariantId === variant.id
                ? "2px solid #1976d2"
                : "1px solid #ccc",
          }}
        >
          {variant.size} ({variant.quantity})
        </Button>
      ))}

      <CardActions>
        <Button
          disabled={!selectedVariant || isMaxReached || maxStock === 0}
          onClick={() =>
            selectedVariant &&
            addToCart(selectedVariant.id, selectedVariant.quantity)
          }
        >
          {maxStock === 0
            ? "Out of stock"
            : isMaxReached
            ? "Max Added"
            : `Add to Cart (${cartQuantity})`}
        </Button>
      </CardActions>
    </Card>
    </Grid>
  )
}


export default ProductCard;
