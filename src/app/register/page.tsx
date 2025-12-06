"use client"
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import assest from "@/assets";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { createCustomer } from "@/services/actions/createCustomer";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type TCustomerData = {
    name: string
    email: string
    contactNumber: string
    address: string
    gender: string
  }
type TCustomerRegisterData = {
  password: string
  customer: TCustomerData
}

const RegisterPage = () => {
  const router = useRouter();
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm<TCustomerRegisterData>()
    const onSubmit: SubmitHandler<TCustomerRegisterData> = async (data) => {
      data.customer.gender = "MALE"
      const payload = modifyPayload(data)
      try{
        const res = await createCustomer(payload)
        if(res?.data?.id){
          toast.success(res?.message)
          router.push("/login")
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
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid size={{ md: 12 }}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("customer.name")}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("customer.email")}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("password")}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <TextField
                    label="contact Number"
                    type="tel"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("customer.contactNumber")}
                  />
                </Grid>
                <Grid size={{ md: 6 }}>
                  <TextField
                    label="Address"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("customer.address")}
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
            </form>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
