import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

export interface ProductCategory {
  productId: string;
  categoryId: string;
  // optionally include product or category objects if needed
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  parent?: Category | null;
  children?: Category[];
  createdAt: string; // or Date if you're parsing
  updatedAt: string; // or Date
  productCategory?: ProductCategory[]; // Replace `any` with proper type if needed
  image: string; // Future-proof: optional image URL
}


const Categories = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`, {
    next: {
      revalidate: 30
    }
  })
  const { data: { data: categories } } = await res.json()
  // const {data : categories} = data
  return (
    <Container>
<Box sx={{
  margin: "40px 0px",
  textAlign: "center"
}}>
  <Box>
    <Typography variant="h4" fontWeight={400}>Available categories you can try.....</Typography>
    <Typography component="p" fontWeight={400} fontSize={18}>An about endless items on needs category</Typography>
  </Box>
  <Stack direction="row" gap={4} mt={5}>
    {categories.map((category: Category) => <Box key={category.id} sx={{
      flex: 1,
      width: "150px",
      backgroundColor: "rgba(245, 245, 245, 1)",
      border: "1px solid rgba(250, 250, 250, 0)",
      borderRadius: "10px",
      padding: "24px 16px",
      textAlign: "center",
      "& img": {
        width: "70px",
        height: "70px",
        margin: "0 auto"
      },
      "&:hover": {
        border: "1px solid rgba(24, 103, 207, 1)"
        
      }

    }}>
      <Image src={category?.image} alt="category image" width={100} height={100}/>
      <Box>
         <Typography component="p" fontWeight={400} fontSize={18} mt={1}>{category.name}</Typography>
      </Box>
    </Box>)}

  </Stack>
  <Button variant="outlined" sx={{
    marginTop: "24px"
  }}> View All</Button>
</Box>
    </Container>
  )
}

export default Categories;