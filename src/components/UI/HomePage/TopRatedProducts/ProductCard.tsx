"use client";

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
import { useState } from "react";

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
type CartItem = {
  productId: string;
  variantId: string;
  name: string;
  price: number;
  image: string | null;
  quantity: number;
  maxQuantity: number;
  size: string
};
type LocalCartItem = {
  variantId: string;
  quantity: number;
};

const ProductCard = ({ product }: { product: TProduct }) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  // console.log(cart);

  // const hope = "Hope-" + new Date().getFullYear() + "-" + new Date().getMonth() + "-"+ new Date().getDate() + "-" + new Date().getHours() + "-" + new Date().getMinutes() + "-" + Number((Math.random()*1000000).toFixed(0));
  
  const CART_KEY = "cart-items";

          
          const addtoLocalStorage = (variant: TVariant) => {
            // 1️⃣ Read existing cart (safe)
            const raw = localStorage.getItem(CART_KEY);
            const cart: LocalCartItem[] = raw ? JSON.parse(raw) : [];
          
            // 2️⃣ Check if variant already exists
            const existing = cart.find(
              (item) => item.variantId === variant.id
            );
          
            if (existing) {
              // 3️⃣ Increase quantity
              existing.quantity += 1;
            } else {
              // 4️⃣ Add new variant
              cart.push({
                variantId: variant.id,
                quantity: 1,
              });
            }
          
            // 5️⃣ Save back to localStorage
            localStorage.setItem(CART_KEY, JSON.stringify(cart));
          };
          

  const addToCart = (product: TProduct, variant: TVariant) => {
    if (variant.quantity <= 0) return;
    setCart((prev) => {
      const existing = prev.find((item) => item.variantId === variant.id);

      if (existing) {
        return prev.map((item) =>
          item.variantId === variant.id && item.quantity < item.maxQuantity
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          variantId: variant.id,
          name: product.name,
          price: variant.price,
          image: product.images,
          quantity: 1,
          maxQuantity: variant.quantity,
          size: variant.size
        },
      ];
    });
  };

  const decreaseItem = (variantId: string) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.variantId === variantId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const increaseItem = (variantId: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.variantId === variantId && item.quantity < item.maxQuantity
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const removeItem = (variantId: string) => {
    setCart((prev) => prev.filter((item) => item.variantId !== variantId));
  };
  const selectedVariant = product.variants.find(
    (v) => v.id === selectedVariantId
  );
  

  return (
    <Grid key={product.id} size={{ xs: 6, md: 4 }}>
      <Card>
        <Box>
          <Image
            src={product.images}
            alt="Product image"
            width={100}
            height={100}
          />
        </Box>
        <CardContent>
          <Typography
            variant="h6"
            component="h1"
            sx={{ color: "text.secondary" }}
          >
            BDT {product.basePrice}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {product.description}
          </Typography>
        </CardContent>
        {product.variants.map((variant) => {
          const isSelected = selectedVariantId === variant.id;

          return (
            <button
              key={variant.id}
              onClick={() => setSelectedVariantId(variant.id)}
              // onClick={() =>
              //   setSelectedVariantId((prev) =>
              //     prev === variant.id ? null : variant.id
              //   )}
              style={{
                border: isSelected ? "2px solid #1976d2" : "1px solid #ccc",
                background: isSelected ? "#e3f2fd" : "#fff",
                padding: "6px 12px",
                marginRight: "8px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              {variant.size} ({variant.quantity})
            </button>
          );
        })}

        <CardActions
          sx={{
            justifyContent: "space-between",
            px: "20px",
          }}
        >
          {/* {cart.map((item) => (
            <div key={item.variantId}>
              <p>{item.name}-{item.size}</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: ${item.price}</p>

              <button onClick={() => decreaseItem(item.variantId)}>-</button>
              <button onClick={() => increaseItem(item.variantId)}>+</button>
              <button onClick={() => removeItem(item.variantId)}>Remove</button>
            </div> 
          ))} */}
          <Button
            disabled={!selectedVariantId  || selectedVariant?.quantity === 0}
            onClick={() => {
              const variant = product.variants.find(
                (v) => v.id === selectedVariantId
              );
              if (variant) {
                addToCart(product, variant);
                addtoLocalStorage(variant)
              }
            }}
          >
            {selectedVariant?.quantity === 0 ? "Out of stock" : "Add to Cart"}
          </Button>
          <Button variant="outlined">Vew Details</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ProductCard;
