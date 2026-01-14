// redirect.ts
import { useSearchParams } from "next/navigation";

export const useRedirectTo = () => {
  const searchParams = useSearchParams();

  return () => {
    const redirect = searchParams.get('redirect');
    const storedRedirect = sessionStorage.getItem('redirectAfterLogin');

    if (redirect === 'checkout' || storedRedirect === '/checkout') {
      sessionStorage.removeItem('redirectAfterLogin');
      return '/checkout';
    }

    return '/';
  };
};

  