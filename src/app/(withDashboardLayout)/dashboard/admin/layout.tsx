'use client';

import { useAuth } from '@/context/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CircularProgress, Box } from '@mui/material';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    } else if (userInfo.role !== 'ADMIN') {
      router.push('/');
    }
  }, [userInfo, router]);

  if (!userInfo || userInfo.role !== 'ADMIN') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}