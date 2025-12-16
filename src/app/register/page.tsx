"use client"
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import assest from "@/assets";
import Link from "next/link";
import { modifyPayload } from "@/utils/modifyPayload";
import { createCustomer } from "@/services/actions/createCustomer";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth-services";
import RUForm from "@/services/ReUsableForms/RUForm";
import { FieldValues } from "react-hook-form";
import RUInput from "@/services/ReUsableForms/RUInput";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export const validationSchema = z.object({
  password: z.string().min(6, "Please give valid password"),
  customer: z.object({
    name: z.string().min(1, "Give a valid customer name"),
    email: z.email("Give a proper email"),
    contactNumber: z.string().regex(/^\d{11}$/, "Give a BD valid cell phone number"),
    address: z.string().min(1,"Give your address").optional()
  })
})

const RegisterPage = () => {

  const router = useRouter();
  const [error, setError] = useState("");

    const handleRegister = async (data: FieldValues) => {
      data.customer.gender = "MALE"
      const payload = modifyPayload(data)
      try{
        const res = await createCustomer(payload)
        if(res?.data?.id){
          toast.success(res?.message)
                const result = await userLogin({email:data.customer.email, password: data.password});
                if (result?.data?.accessToken) {
                  storeUserInfo({ accessToken: result?.data?.accessToken });
                  router.push("/")
                }
        }else{
          toast.error(res?.message)
          setError(res.message)
        }
      }catch(err){
        console.error(err)
      }
    }
  return (
    <Container
    >
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
                User Registration
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
            <RUForm onSubmit={handleRegister} resolver={zodResolver(validationSchema)}>
              <Grid container spacing={2}>
                <Grid size={{ md: 12 }}>
                  <RUInput
                  name="customer.name"
                    label="Name"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <RUInput
                  name="customer.email"
                    label="Email"
                    type="email"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <RUInput
                  name="password"
                    label="Password"
                    type="password"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <RUInput
                  name="customer.contactNumber"
                    label="contact Number"
                    type="tel"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <RUInput
                  name="customer.address"
                    label="Address"
                    type="text"
                    size="small"
                    placeholder="Give Address"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Register
              </Button>
              <Typography component="p" fontWeight={200}>
                Do you already have an account?{" "}
                <Link href={"/login"}>login</Link>
              </Typography>
            </RUForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
