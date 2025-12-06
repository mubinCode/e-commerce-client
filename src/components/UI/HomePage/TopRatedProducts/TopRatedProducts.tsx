import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import Image from "next/image";

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
}

const TopRatedProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/product?page=0&limit=3&search=clothing`);

  const { data: { data: products } } = await res.json();

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
      <Container sx={{
        margin: "30px auto"
      }}>
        <Grid container spacing={4}>
          {products?.map((product: Product) => (
            <Grid key={product.id} size={{ xs: 6, md: 4 }}>
              <Card >
<Box>
  <Image src={product.images} alt="Product image" width={100} height={100}/>
</Box>
                <CardContent>
                  <Typography variant="h6" component="h1" sx={{ color: "text.secondary" }}>
                    BDT {product.basePrice}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {product.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{
                  justifyContent: "space-between",
                  px: "20px"
                }}>
                  <Button>Add To Cart</Button>
                  <Button variant="outlined">Vew Details</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{
          textAlign: "center",
          mt: 2
        }}>
          <Button variant="outlined">View all</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopRatedProducts;
