"use client"
import { Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import Image from "next/image";

type TProduct = {
id:string
name: string
slug: string
description: string
basePrice: number
costPrice?: number
weight?: number
images: string
}

const ProductCard = ({product}: {product: TProduct}) => {
    const handleCart = (values: string | number) => {
        console.log(values);
    }
    console.log(product);
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
          <CardActions
            sx={{
              justifyContent: "space-between",
              px: "20px",
            }}
          >
            <Button onClick={() => handleCart(product.id)}>Add To Cart</Button>
            <Button variant="outlined">Vew Details</Button>
          </CardActions>
        </Card>
      </Grid>
    );
};

export default ProductCard;