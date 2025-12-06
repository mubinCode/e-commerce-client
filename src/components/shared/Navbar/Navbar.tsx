"use client";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
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
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default Navbar;
