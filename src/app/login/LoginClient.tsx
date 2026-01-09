"use client";
import assest from "@/assets";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth-services";
import RUForm from "@/components/ReUsableForms/RUForm";
import RUInput from "@/components/ReUsableForms/RUInput";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const validationSchema = z.object({
  email: z.email("Please give a valid email"),
  password: z.string().min(6, "Please give valid password"),
});

const LoginClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const handleLogin = async (data: FieldValues) => {
    try {
      const res = await userLogin(data);
      if (res?.data?.accessToken) {
        toast.success(res.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
        window.dispatchEvent(new Event("auth-change"));
        const redirect = searchParams.get('redirect');
        const storedRedirect = sessionStorage.getItem('redirectAfterLogin');
        
        if (redirect === 'checkout' || storedRedirect === '/checkout') {
          sessionStorage.removeItem('redirectAfterLogin');
          router.push('/checkout');
        } else {
          router.push('/');
        }
      } else {
        toast.error(res.message);
        setError(res.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: "600px",
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            padding: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image
                src={assest.images.register}
                alt="register"
                width={150}
                height={150}
              />
            </Box>
            <Box margin={2}>
              <Typography variant="h3" color="primary" fontWeight={600}>
                Login Here
              </Typography>
            </Box>
          </Stack>
          {error && (
            <Box>
              <Typography
                sx={{
                  backgroundColor: "red",
                  padding: "5px",
                  margin: "15px 0px",
                  borderRadius: "10px",
                  color: "white",
                }}
                variant="h6"
              >
                {error}
              </Typography>
            </Box>
          )}
          <Box>
            <RUForm
              onSubmit={handleLogin}
              resolver={zodResolver(validationSchema)}
            >
              <Grid container spacing={2}>
                <Grid size={{ md: 6 }}>
                  <RUInput
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth={true}
                    // required={true}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <RUInput
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth={true}
                    // required={true}
                  />
                </Grid>
              </Grid>
              <Typography
                textAlign="end"
                component="p"
                fontWeight={200}
                margin="5px 0px"
              >
                forgot password?
              </Typography>
              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>
              <Typography component="p" fontWeight={200}>
                Don&apos;t have an account? please{" "}
                <Link href={"/register"}>Register</Link>
              </Typography>
            </RUForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default LoginClient;
