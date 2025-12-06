import { Box, Container, Typography, Grid } from "@mui/material";
import Image from "next/image";
import asset from "@/assets";

const WhyUs = async () => {
  return (
    <Container>
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            color="primary"
            variant="h6"
            component="h1"
            fontWeight={700}
          >
            Why Us
          </Typography>
          <Typography variant="h4" component="h1" fontWeight={700}>
            Why Choose Us
          </Typography>
        </Box>
        <Grid container spacing={2} my={4} justifyContent="space-between" padding={2}>
          <Grid size={{ md: 6 }}>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                backgroundColor: "rgba(245, 245, 245, 1)",
                padding: "20px",
                alignItems: "center",
                borderRadius: " 10px 10px 100px 10px",
                margin: "20px 0px"
              }}
            >
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <Image
                  src={asset.svg.accomplishment}
                  alt="icon"
                  width={30}
                  height={30}
                />
              </Box>
              <Box>
                <Typography variant="h6" component="h6" fontWeight={600}>
                  Award Winning Service
                </Typography>
                <Typography
                  variant="body2"
                  color="primary.body1"
                  fontWeight={300}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Magnam harum facilis vitae quia possimus illo mollitia a
                  nostrum eveniet et.
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                backgroundColor: "rgba(245, 245, 245, 1)",
                padding: "20px",
                alignItems: "center",
                borderRadius: " 10px 100px 10px 10px",
                margin: "20px 0px"
              }}
            >
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <Image
                  src={asset.svg.accomplishment}
                  alt="icon"
                  width={30}
                  height={30}
                />
              </Box>
              <Box>
                <Typography variant="h6" component="h6" fontWeight={600}>
                  Award Winning Service
                </Typography>
                <Typography
                  variant="body2"
                  color="primary.body1"
                  fontWeight={300}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Magnam harum facilis vitae quia possimus illo mollitia a
                  nostrum eveniet et.
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                backgroundColor: "rgba(245, 245, 245, 1)",
                padding: "20px",
                alignItems: "center",
                borderRadius: " 10px 10px 100px 10px",
                margin: "20px 0px"
              }}
            >
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <Image
                  src={asset.svg.accomplishment}
                  alt="icon"
                  width={30}
                  height={30}
                />
              </Box>
              <Box>
                <Typography variant="h6" component="h6" fontWeight={600}>
                  Award Winning Service
                </Typography>
                <Typography
                  variant="body2"
                  color="primary.body1"
                  fontWeight={300}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Magnam harum facilis vitae quia possimus illo mollitia a
                  nostrum eveniet et.
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "15px",
                backgroundColor: "rgba(245, 245, 245, 1)",
                padding: "20px",
                alignItems: "center",
                borderRadius: " 10px 100px 10px 10px",
                margin: "20px 0px"
              }}
            >
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                <Image
                  src={asset.svg.accomplishment}
                  alt="icon"
                  width={30}
                  height={30}
                />
              </Box>
              <Box>
                <Typography variant="h6" component="h6" fontWeight={600}>
                  Award Winning Service
                </Typography>
                <Typography
                  variant="body2"
                  color="primary.body1"
                  fontWeight={300}
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Magnam harum facilis vitae quia possimus illo mollitia a
                  nostrum eveniet et.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid>
            <Image
              src={asset.svg.awarding}
              alt="awarding"
              width={500}
              height={400}
              style={{ height: "550px", width: "500px" }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default WhyUs;
