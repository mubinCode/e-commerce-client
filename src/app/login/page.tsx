"use client";
import assest from "@/assets";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth-services";
import RUForm from "@/services/ReUsableForms/RUForm";
import RUInput from "@/services/ReUsableForms/RUInput";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";


const LoginPage = () => {
  const router = useRouter();
  const handleLogin = async (data : FieldValues) => {
    try {
      const res = await userLogin(data);
      if (res?.data?.accessToken) {
        toast.success(res.message)
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/")
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
          <Box>
            <RUForm onSubmit={handleLogin}>
              <Grid container spacing={2}>
                <Grid size={{ md: 6 }}>
                  <RUInput
                  name="email"
                    label="Email"
                    type="email"
                    fullWidth={true}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <RUInput
                  name="password"
                    label="Password"
                    type="password"
                    fullWidth={true}
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

export default LoginPage;
