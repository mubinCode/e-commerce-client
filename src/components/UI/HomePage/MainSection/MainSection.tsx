import { Box, Button, Container, Typography } from "@mui/material";
import asset from "@/assets"
import Image from "next/image";

const MainSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        direction: "row",
        my: 10
      }}
    >
      <Box
        sx={{
          flex: 1,
          position: "relative",
          // border: "1px red solid",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "700px",
            top: "-90px",
            left: "-120px",
            // border: "1px green solid",
          }}
        >
          <Image src={asset.svg.grid} alt="grid" />
        </Box>
        <Typography variant="h3" component="h1" fontWeight={600}>
          Shop Smart,
        </Typography>
        <Typography variant="h3" component="h1" fontWeight={600}>
          Live Better
        </Typography>
        <Typography
          variant="h3"
          component="h1"
          fontWeight={600}
          color="primary.main"
        >
          Endless Choices
        </Typography>
        <Typography
          variant="h6"
          component="p"
          fontWeight={400}
          sx={{
            width: "50%",
            my: 4
          }}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam qui
          suscipit incidunt molestiae voluptates fuga facilis at aliquam.
          Necessitatibus?
        </Typography>

          <Box sx={{
            display: "flex",
            gap: 2
          }}>
                    <Button>Add To Cart</Button>
        <Button
          variant="outlined"
        >
          Contact Us
        </Button>
          </Box>
      </Box>
      <Box sx={{
        p: 1,
        flex: 1,
        display: "flex",
        justifyContent: "center",
        position: "relative",
        mt: 0,
      }}>
        <Box sx={{
          position: "absolute",
          mt: -1,
          zIndex: "-1"
        }}>
          <Image src={asset.images.kids} alt = "Kids Cloth" width={160} height={200}  />
        </Box>
        <Box sx={{
          display: "flex",
          gap: 8,
          mt: 12
          
        }}>
          <Box mr={4}><Image src={asset.images.orange} alt = "Mango" width={200} height={140} /></Box>
          <Box><Image src={asset.images.grocery} alt = "Grocery"  width={200} height={140} /></Box>
        </Box>
        <Box sx={{
          position: "absolute",
          mt: 26
        }}>
          <Image src={asset.images.fruits} alt="Fruits" width={230} height={230} />
        </Box>
      </Box>
    </Container>
  );
};

export default MainSection;
