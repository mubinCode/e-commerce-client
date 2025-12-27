"use client"
import { Box, Button, Stack, TextField } from "@mui/material";
import ProductModal from "./productModal/ProductModal";
import { useState } from "react";

const ProductPage = () => {
      const [isModalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" justifyItems="center">
        <Button onClick={() => setModalOpen(true)}>Create Product</Button>
        <ProductModal open={isModalOpen} setOpen={setModalOpen} />
                <TextField size="small" placeholder="Search product" />
      </Stack>
    </Box>
  );
};

export default ProductPage;
