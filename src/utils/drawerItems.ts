import { USER_ROLE } from "@/constants/role";
import { IDraweItem, UserRole } from "@/types";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import CategoryIcon from "@mui/icons-material/Category";
import PixIcon from '@mui/icons-material/Pix';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import EggIcon from "@mui/icons-material/Egg";
import PaymentIcon from "@mui/icons-material/Payment";

export const drawerItems = (role: UserRole): IDraweItem[] => {
  const roleMenus: IDraweItem[] = [];
  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Manage Users",
          path: `${role}/mange-users`,
          icon: GroupIcon,
        }
      );
      break;
    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Customers",
          path: `${role}/customers`,
          icon: GroupIcon,
        },
        {
          title: "Categories",
          path: `${role}/categories`,
          icon: CategoryIcon,
        },
        {
          title: "Brand",
          path: `${role}/brand`,
          icon: PixIcon,
        },
        {
          title: "Products",
          path: `${role}/products`,
          icon: EggIcon,
        },
        {
          title: "Reviews",
          path: `${role}/reviews`,
          icon: FavoriteBorderIcon,
        },
        {
          title: "Orders",
          path: `${role}/orders`,
          icon: ViewStreamIcon,
        }
      );
      break;
    case USER_ROLE.CUSTOMER:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: DashboardIcon,
        },
        {
          title: "Orders",
          path: `${role}/orders`,
          icon: ViewStreamIcon,
        },
        {
          title: "Payment History",
          path: `${role}/payment-history`,
          icon: PaymentIcon,
        }
      );
      break;
    default:
      break;
  }
  return [...roleMenus];
};
