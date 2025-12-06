import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import facebookIcons from "@/assets/images/facebook.png";
import InstaIcons from "@/assets/images/insta.png";
import GoogleIcons from "@/assets/images/google.png";
import LinkedInIcons from "@/assets/images/linkedIn.png";
import Link from "next/link";

const Footer = () => {
  return (
    <Box bgcolor="rgb(17, 26, 34)" py={5}>
      <Container>
        <Stack direction="row" justifyContent="center" gap={4}>
          <Typography color="#ffff">Team</Typography>
          <Typography color="#ffff">Career</Typography>
          <Typography color="#ffff">About</Typography>
          <Typography color="#ffff">Contact</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          gap={3}
          py={3}
          alignItems="center"
        >
          <Image src={facebookIcons} height={30} width={30} alt="facebook" />
          <Image src={InstaIcons} height={30} width={30} alt="instagram" />
          <Image src={GoogleIcons} height={30} width={30} alt="instagram" />
          <Image src={LinkedInIcons} height={30} width={30} alt="instagram" />
        </Stack>
        <div className="border-b-[1px] border-dashed"></div>
        <Stack
          direction="row"
          justifyContent="space-between"
          gap={4}
          alignItems="center"
          py={1}
        >
          <Typography component="p" color="#ffff">
            @2025 Client App. all right reserved
          </Typography>
          <Link href="/">
            <Typography variant="h4" fontWeight={600} color="white">
              C
              <Box component="span" color="primary.main">
                l
              </Box>
              ient App
            </Typography>
          </Link>
          <Typography component="p" color="#ffff">
            privacy policy | Terms & condition
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
