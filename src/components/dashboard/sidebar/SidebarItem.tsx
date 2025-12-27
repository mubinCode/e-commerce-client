import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { IDraweItem } from "@/types";
import { usePathname } from "next/navigation";

interface IProps {
  item: IDraweItem;
}
const SidebarItem = ({ item }: IProps) => {
  const linkPath = `/dashboard/${item.path}`;
  const pathName = usePathname();
  return (
    <Link href={linkPath}>
      <ListItem
        disablePadding
        sx={{
          ...(linkPath === pathName
            ? {
                borderRight: "3px solid #1586FD",
                "& svg": {
                  color: "#1586FD",
                },
                boxShadow: 1,
              }
            : {}),
        }}
      >
        <ListItemButton>
          <ListItemIcon>{item?.icon && <item.icon />}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItem;
