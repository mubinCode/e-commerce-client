'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container, Typography, Button, Paper, Stack, Box } from '@mui/material';
import { toast } from 'sonner';
import CancelIcon from '@mui/icons-material/Cancel';

export default function PaymentFailedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('transactionId');

  useEffect(() => {
    toast.error('Payment failed or was declined');
  }, []);

  return (
    <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Stack spacing={3} alignItems="center">
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: 'error.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CancelIcon sx={{ fontSize: 60, color: 'error.main' }} />
          </Box>
          <Typography variant="h4" fontWeight={600}>
            Payment Failed
          </Typography>
          <Typography color="text.secondary">
            Your payment could not be processed. No charges were made to your account.
          </Typography>

          {transactionId && (
            <Box
              sx={{
                width: '100%',
                bgcolor: 'grey.100',
                p: 2,
                borderRadius: 1,
                textAlign: 'left',
              }}
            >
              <Typography variant="caption" color="text.secondary" display="block">
                Transaction ID:
              </Typography>
              <Typography
                variant="body2"
                fontWeight={500}
                sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}
              >
                {transactionId}
              </Typography>
            </Box>
          )}

          <Stack direction="row" spacing={2} width="100%" mt={2}>
            <Button variant="contained" fullWidth onClick={() => router.push('/checkout')}>
              Try Again
            </Button>
            <Button variant="outlined" fullWidth onClick={() => router.push('/')}>
              Back to Home
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}