import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import ProductCard from "./ProductCard";

type TVariant = {
  id: string;
  sku: string;
  price: number;
  quantity: number;
  size: string;
};

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  basePrice: number;
  costPrice: number;
  sku: string;
  weight: number;
  dimensions: string | null;
  vendorId: string;
  brandId: string;
  isActive: boolean;
  isPublished: boolean;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
  images: string; // or string[] if multiple images are expected
  brand: string;
  categories: string[]; // or Category[] if you need full data
  variants: TVariant[];
}

const TopRatedProducts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/product?page=0&limit=3&search=clothing`
  );

  const {
    data: { data: products },
  } = await res.json();

  return (
    <Box
      sx={{
        my: 10,
        py: 30,
        backgroundColor: "rgba(20, 20, 20, 0.1)",
        clipPath: "polygon(0 0, 100% 25%, 100% 100%, 0 75%)",
      }}
    >
      <Box textAlign="center">
        <Typography variant="h4" fontWeight={400}>
          Best of best from reviews
        </Typography>
        <Typography component="p" fontWeight={400} fontSize={18}>
          Best product not that only deliver but also satisfied you.
        </Typography>
      </Box>
      <Container
        sx={{
          margin: "30px auto",
        }}
      >
        <Grid container spacing={4}>
          {products?.map((product: Product) => (
            <ProductCard key={product.id} product={product}></ProductCard>
          ))}
        </Grid>
        <Box
          sx={{
            textAlign: "center",
            mt: 2,
          }}
        >
          <Button variant="outlined">View all</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopRatedProducts;
