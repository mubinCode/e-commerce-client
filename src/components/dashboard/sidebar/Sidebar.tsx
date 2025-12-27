import { Box, List, Stack, Typography } from "@mui/material";
import assest from "@/assets";
import Image from "next/image";
import Link from "next/link";
import { drawerItems } from "@/utils/drawerItems";
import { UserRole } from "@/types";
import SidebarItem from "./SidebarItem";
import { getAuthInfo } from "@/services/auth-services";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const role = getAuthInfo()?.role;
    if (role) setUserRole(role);
  }, []);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        gap={1}
        paddingY={1}
      >
        <Image
          src={assest.images.register}
          alt="register"
          width={45}
          height={45}
        />

        <Link href="/">
          <Typography
            variant="h6"
            fontWeight={700}
            component="h1"
            sx={{ cursor: "pointer" }}
          >
            C
            <Box color="primary.main" component="span">
              l
            </Box>
            ient App
          </Typography>
        </Link>
      </Stack>
      <List>
        {drawerItems(userRole as UserRole).map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
