"use client";

import { Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const { cartCount } = useCart();
  const AuthButton = dynamic(
    () => import("@/components/UI/AuthButton/AuthButton"),
    { ssr: false }
  );
  return (
    <Container>
      <Stack
        py={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" component={Link} href="/" fontWeight={600}>
          C
          <Box component="span" color="primary.main">
            l
          </Box>
          ient App
        </Typography>
        <Stack direction="row" justifyContent="space-between" gap={4}>
          <Typography>Category</Typography>
          <Typography>Brand</Typography>
          <Typography>Popular</Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              position: "fixed",
              top: { xs: "auto", md: 20 },
              bottom: { xs: 20, md: "auto" },
              right: 20,
              zIndex: 1300, // above navbar & content
              cursor: "pointer",
            }}
          >
            <Link href="/cart">
              <Box sx={{ position: "relative" }}>
                <AddShoppingCartIcon fontSize="large" />

                {cartCount > 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      background: "#1586FD",
                      color: "#fff",
                      borderRadius: "50%",
                      width: 18,
                      height: 18,
                      fontSize: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cartCount}
                  </Box>
                )}
              </Box>
            </Link>
          </Box>
          <AuthButton />
        </Stack>
      </Stack>
    </Container>
  );
};

export default Navbar;
