"use client";

import CartItem from "@/components/shared/cart/CartItem";
import CartSummary from "@/components/shared/cart/CartSummary";
import { useCart } from "@/context/CartContext";
import { useGetSelectedCartMutation } from "@/redux/api/cartApi";
import { Box, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useMemo } from "react";

export interface CartVariant {
  id: string;
  price: number;
  image: string | null;
  productName: string;
  size: string;
  quantity: number;
}

const CartPage = () => {
  const { effectiveCart, increaseItem, decreaseItem, removeItem } = useCart();
  const cartItemIds = useMemo(
    () => effectiveCart.map((item) => item.variantId),
    [effectiveCart]
  );

  const [getSelectedCart, { data: cartData }] = useGetSelectedCartMutation();

  // Fetch latest product variant info whenever cart IDs change
  useEffect(() => {
    if (cartItemIds.length === 0) return;

    getSelectedCart({ ids: cartItemIds }).unwrap().catch(console.error);
  }, [getSelectedCart, cartItemIds]);

  // Merge cart (local quantity) with server data (price, name, image)
  const mergedCart = useMemo(() => {
    return effectiveCart.map((item) => {
      const variant = cartData?.find(
        (v: CartVariant) => v.id === item.variantId
      );
      return {
        ...item,
        price: variant?.price ?? 0,
        name: variant?.productName ?? "",
        image: variant?.image ?? null,
        size: variant?.size ?? "S",
        variantQuantity: variant?.variantQuantity ?? 0,
      };
    });
  }, [effectiveCart, cartData]);

  //   if (isLoading) return <p>Loading cart...</p>;

  if (effectiveCart.length === 0)
    return (
      <Box>
        <Typography variant="h4" component={Link} href="/" fontWeight={600}>
          C
          <Box component="span" color="primary.main">
            l
          </Box>
          ient App
        </Typography>
      </Box>
    );
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <Typography variant="h4" component={Link} href="/" fontWeight={600}>
        C
        <Box component="span" color="primary.main">
          l
        </Box>
        ient App
      </Typography>
      <h1 className="text-2xl font-bold mb-4 text-center">My Cart</h1>

      <Stack direction="row" spacing={3}>
        <Stack width="60%" spacing={2}>
          {mergedCart.map((item) => (
            <CartItem
              key={item.variantId}
              item={item}
              product={{
                name: item.name,
                price: item.price,
                image: item.image,
                size: item.size,
                variantQuantity: item.variantQuantity,
              }}
              onIncrease={() => increaseItem(item.variantId)}
              onDecrease={() => decreaseItem(item.variantId)}
              onRemove={() => removeItem(item.variantId)}
            />
          ))}
        </Stack>
        <Stack width="40%">
          <CartSummary cart={mergedCart} />
        </Stack>
      </Stack>
    </div>
  );
};

export default CartPage;
