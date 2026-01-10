"use client";

import { Stack } from "@mui/material";
import Image from "next/image";

export interface CartItemProps {
  item: {
    variantId: string;
    quantity: number;
  };
  product: {
    name: string;
    price: number;
    image: string | null;
    size: string;
    variantQuantity: number;
  };
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const CartItem = ({
  item,
  product,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) => {
  return (
    <div className="flex gap-4 border p-4 rounded">
      {product?.image && (
        <Image
          src={product.image}
          alt={product.name}
          width={100}
          height={100}
          className="w-20 h-20 object-cover"
        />
      )}

      <div className="flex-1">
        <p className="font-semibold">{product?.name}</p>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <p>${product?.price}</p>
          <p>{product?.size}</p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onDecrease}
              className="px-2 bg-gray-200 rounded"
            >
              -
            </button>
            <span>{item.quantity}</span>
            {item.quantity < product.variantQuantity ? (
              <button
                type="button"
                onClick={onIncrease}
                className="px-2 bg-gray-200 rounded"
              >
                +
              </button>
             ) : (
              <></>
            )} 
          </div>
        </Stack>
      </div>

      <button type="button" className="text-red-500" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
};

export default CartItem;