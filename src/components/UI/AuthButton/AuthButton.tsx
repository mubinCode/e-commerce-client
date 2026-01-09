import { getAuthInfo, removeAuthUser } from "@/services/auth-services";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthButton = () => {
    const router = useRouter();
    const userInfo = getAuthInfo();
    const handleLogout = () => {
      removeAuthUser();
      window.dispatchEvent(new Event("auth-change"));
      router.refresh();
    };
    return <>
            {userInfo?.role ? (
          <Button color="error" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
    </>
}

export default AuthButton;