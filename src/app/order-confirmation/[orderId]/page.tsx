import { Container, Box, Typography, Stack } from "@mui/material";
import LogoLink from "@/components/logo/LogoLink";

type PageProps = {
  params: {
    orderId: string;
  };
};

const OrderConfirmationPage = async ({ params }: PageProps) => {
  const { orderId } = await params;

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
