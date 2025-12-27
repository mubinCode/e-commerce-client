"use client";

import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import BrandModal from "./brandModal/BrandModal";

const BrandPage = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        justifyItems="center"
      >
        <Button onClick={() => setModalOpen(true)}>Create Brand</Button>
        <BrandModal open={isModalOpen} setOpen={setModalOpen} />
        <TextField size="small" placeholder="Search brand" />
      </Stack>
    </Box>
  );
};

export default BrandPage;
