// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Container, Typography, CircularProgress, Box } from '@mui/material';
// import { useConfirmPaymentMutation } from '@/redux/api/orderApi';
// import { toast } from 'sonner';

// export default function PaymentSuccessPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   console.log("searchParams", searchParams);
//   const transactionId = searchParams.get('transactionId');
//   const [confirmPayment] = useConfirmPaymentMutation();
//   const [isProcessing, setIsProcessing] = useState(true);

//   useEffect(() => {
//     console.log("transactionId", transactionId);
//     if (!transactionId) {
//       toast.error('Invalid payment session');
//       router.push('/');
//       return;
//     }

//     const processPayment = async () => {
//       try {
//         console.log("try to call success")
//         const response = await confirmPayment({ transactionId }).unwrap();
        
//         if (response?.orderId) {
//           toast.success('Payment successful! Order confirmed.');
//           // Clear any pending order data
//           sessionStorage.removeItem('pendingOrder');
//           router.push(`/order-confirmation/${response.orderId}`);
//         } else {
//           throw new Error('Failed to confirm order');
//         }
//       } catch (error) {
//         console.error('Payment confirmation error:', error);
//         toast.error( 'Payment verification failed');
//         router.push('/checkout');
//       } finally {
//         setIsProcessing(false);
//       }
//     };

//     processPayment();
//   }, [transactionId, confirmPayment, router]);

//   return (
//     <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
//       <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
//         <CircularProgress size={60} />
//         <Typography variant="h5">
//           Processing your payment...
//         </Typography>
//         <Typography color="text.secondary">
//           Please wait while we confirm your order.
//         </Typography>
//       </Box>
//     </Container>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Button,
  Alert,
  Paper,
  Stack
} from '@mui/material';
import { useConfirmPaymentMutation, useRetryPaymentMutation } from '@/redux/api/orderApi';
import { toast } from 'sonner';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const transactionId = searchParams.get('transactionId');

  const [confirmPayment] = useConfirmPaymentMutation();
  const [retryPayment] = useRetryPaymentMutation();

  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [orderId, setOrderId] = useState<string | null>(null);

  const MAX_RETRIES = 3;

  useEffect(() => {
    if (!transactionId) {
      toast.error('Invalid payment session');
      router.push('/');
      return;
    }

    processPayment();
  }, [transactionId]);

  const processPayment = async (isRetry = false) => {
    setIsProcessing(true);
    setError(null);

    try {
      const response = isRetry
        ? await retryPayment({ transactionId: transactionId! }).unwrap()
        : await confirmPayment({ transactionId: transactionId! }).unwrap();

      if (response?.orderId) {
        setOrderId(response.orderId);
        toast.success('Payment successful! Order confirmed.');
        sessionStorage.removeItem('pendingOrder');

        // Delay redirect to show success state
        setTimeout(() => {
          router.push(`/order-confirmation/${response.orderId}`);
        }, 2000);
      } else {
        throw new Error('Failed to confirm order');
      }
    } catch (err) {
      console.error('Payment confirmation error:', err);

      // const errorMessage =
      //   err?.data?.message || err?.message || 'Payment verification failed';

      // setError(errorMessage);
      setError('Payment verification failed');
      toast.error('Payment verification failed');

      // Auto-redirect for certain errors
      // if (
      //   errorMessage.includes('expired') ||
      //   errorMessage.includes('already processed')
      // ) {
        setTimeout(() => router.push('/checkout'), 3000);
      // }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = () => {
    if (retryCount >= MAX_RETRIES) {
      toast.error('Maximum retry attempts reached. Please contact support.');
      return;
    }

    setRetryCount((prev) => prev + 1);
    toast.info(`Retrying... Attempt ${retryCount + 1} of ${MAX_RETRIES}`);
    processPayment(true);
  };

  const handleContactSupport = () => {
    if (navigator.clipboard && transactionId) {
      navigator.clipboard.writeText(transactionId);
      toast.success('Transaction ID copied to clipboard');
    }
    router.push(`/support?transactionId=${transactionId}`);
  };

  // Success State
  if (orderId) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Stack spacing={3} alignItems="center">
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                bgcolor: 'success.light',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main' }} />
            </Box>
            <Typography variant="h4" fontWeight={600}>
              Payment Successful!
            </Typography>
            <Typography color="text.secondary">
              Your order has been confirmed. Redirecting to order details...
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Order ID: {orderId}
            </Typography>
          </Stack>
        </Paper>
      </Container>
    );
  }

  // Processing State
  if (isProcessing) {
    return (
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Stack spacing={3} alignItems="center">
            <CircularProgress size={60} />
            <Typography variant="h5">
              {retryCount > 0 ? 'Retrying...' : 'Processing your payment...'}
            </Typography>
            <Typography color="text.secondary">
              Please wait while we confirm your order.
            </Typography>
            {retryCount > 0 && (
              <Typography variant="caption" color="warning.main" fontWeight={500}>
                Attempt {retryCount} of {MAX_RETRIES}
              </Typography>
            )}
          </Stack>
        </Paper>
      </Container>
    );
  }

  // Error State
  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: 8 }}>
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
              <ErrorIcon sx={{ fontSize: 60, color: 'error.main' }} />
            </Box>
            <Typography variant="h5" fontWeight={600}>
              Payment Verification Issue
            </Typography>

            <Alert severity="warning" sx={{ width: '100%' }}>
              <Typography variant="body2">{error}</Typography>
            </Alert>

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

            {!error.includes('expired') && !error.includes('already processed') && (
              <Alert severity="info" sx={{ width: '100%' }}>
                Your payment was processed, but we encountered an issue confirming
                your order. You can retry or contact support with your transaction ID.
              </Alert>
            )}

            <Stack direction="row" spacing={2} width="100%" mt={2}>
              {retryCount < MAX_RETRIES &&
                !error.includes('expired') &&
                !error.includes('already processed') && (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleRetry}
                    startIcon={<RefreshIcon />}
                  >
                    Retry ({MAX_RETRIES - retryCount} left)
                  </Button>
                )}

              <Button
                variant="outlined"
                fullWidth
                onClick={handleContactSupport}
              >
                Contact Support
              </Button>
            </Stack>

            <Button variant="text" onClick={() => router.push('/')} sx={{ mt: 2 }}>
              Return to Home
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return null;
}