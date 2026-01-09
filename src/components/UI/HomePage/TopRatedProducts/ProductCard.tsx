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

// const ProductCard = ({ product }: { product: TProduct }) => {
//   const { addToCart, cart } = useCart();
//   const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
//     null
//   );

//   const selectedVariant = product.variants.find(
//     (v) => v.id === selectedVariantId
//   );
  
//   const selectedCartItem = cart.find(
//     (item) => item.variantId === selectedVariantId
//   );
  
//   const isMaxReached =
//     !!selectedVariant &&
//     !!selectedCartItem &&
//     selectedCartItem.quantity >= selectedVariant.quantity;

//     return (
//     <Grid key={product.id} size={{ xs: 6, md: 4 }}>
//       <Card>
//         <Box>
//           <Image
//             src={product.images}
//             alt="Product image"
//             width={100}
//             height={100}
//           />
//         </Box>
//         <CardContent>
//           <Typography
//             variant="h6"
//             component="h1"
//             sx={{ color: "text.secondary" }}
//           >
//             BDT {product.basePrice}
//           </Typography>
//           <Typography gutterBottom variant="h5" component="div">
//             {product.name}
//           </Typography>
//           <Typography variant="body2" sx={{ color: "text.secondary" }}>
//             {product.description}
//           </Typography>
//         </CardContent>
//         {product.variants.map((variant) => {
//           const isSelected = selectedVariantId === variant.id;

//           return (
//             <button
//               key={variant.id}
//               onClick={() => setSelectedVariantId(variant.id)}
//               style={{
//                 border: isSelected ? "2px solid #1976d2" : "1px solid #ccc",
//                 background: isSelected ? "#e3f2fd" : "#fff",
//                 padding: "6px 12px",
//                 marginRight: "8px",
//                 borderRadius: "6px",
//                 cursor: "pointer",
//               }}
//             >
//               {variant.size} ({variant.quantity})
//             </button>
//           );
//         })}

//         <CardActions
//           sx={{
//             justifyContent: "space-between",
//             px: "20px",
//           }}
//         >
//           {/* <Button
//               disabled={
//                 !selectedVariantId ||
//                 selectedVariant?.quantity === 0 ||
//                 isMaxReached
//               }
//             onClick={() => {
//               if (selectedVariant) {
//                 addToCart(product, selectedVariant);
//                 // addtoLocalStorage(selectedVariant);
//               }
//             }}
//           >
//             {selectedVariant?.quantity === 0
//               ? "Out of stock"
//               : isMaxReached
//               ? "Max Added"
//               : "Add to Cart"}
//           </Button> */}
//           <Button
//   disabled={
//     !selectedVariantId ||
//     selectedVariant?.quantity === 0 ||
//     isMaxReached
//   }
//   onClick={() =>
//     selectedVariant &&
//     addToCart(selectedVariant.id, selectedVariant.quantity)
//   }
// >
//   {selectedVariant?.quantity === 0
//     ? "Out of stock"
//     : isMaxReached
//     ? "Max Added"
//     : "Add to Cart"}
// </Button>

//           <Button variant="outlined">Vew Details</Button>
//         </CardActions>
//       </Card>
//     </Grid>
//   );
// };

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
