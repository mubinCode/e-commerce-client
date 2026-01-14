"use client";

import React, { useEffect } from "react";
import { Container, Stack, Box, Typography } from "@mui/material";
import { useCart } from "@/context/CartContext";
import LogoLink from "@/components/logo/LogoLink";

type PageProps = {
  params: Promise<{ orderId: string }>;
};

const OrderConfirmationPage = ({ params }: PageProps) => {
  const { orderId } = React.use(params); // unwrap params Promise

  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <Container>
      <Stack my={3}>
        <LogoLink />
        <Box my={2}>
          <Typography variant="h6" component="h1">
            Order Confirmed 🎉
          </Typography>
          <Typography>Your order ID: {orderId}</Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default OrderConfirmationPage;
