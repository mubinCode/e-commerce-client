'use client';

import { Suspense, useEffect, useState } from 'react';
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
import { 
  useCheckPaymentStatusMutation, 
  useRetryPaymentMutation 
} from '@/redux/api/orderApi';
import { toast } from 'sonner';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import RefreshIcon from '@mui/icons-material/Refresh';

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const transactionId = searchParams.get('tran_id');
  const valId = searchParams.get('val_id');
  const status = searchParams.get('status');

  const [checkPaymentStatus] = useCheckPaymentStatusMutation();
  const [retryPayment] = useRetryPaymentMutation();

  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [orderId, setOrderId] = useState<string | null>(null);

  const MAX_RETRIES = 3;
  const CHECK_INTERVAL = 2000; // Check every 2 seconds
  const MAX_CHECKS = 30; // Maximum 30 checks (60 seconds total)

  useEffect(() => {
    if (!transactionId) {
      toast.error('Invalid payment session - missing transaction ID');
      router.push('/');
      return;
    }

    // Check status from SSL Commerz redirect
    if (status && status !== 'VALID') {
      toast.error(`Payment ${status.toLowerCase()}`);
      router.push('/checkout');
      return;
    }

    // Start checking for order
    checkForOrder();
  }, [transactionId]);

  const checkForOrder = async (attempt = 0) => {
    setIsProcessing(true);
    setError(null);

    try {
      console.log(`Checking order status (attempt ${attempt + 1}/${MAX_CHECKS})...`);
      
      const response = await checkPaymentStatus({ transactionId: transactionId! }).unwrap();

      if (response?.orderId) {
        // Order found! IPN already processed it
        console.log('Order found:', response.orderId);
        setOrderId(response.orderId);
        toast.success('Payment successful! Order confirmed.');
        
        // Clear any pending order data
        sessionStorage.removeItem('pendingOrder');

        // Redirect to order confirmation
        setTimeout(() => {
          router.push(`/order-confirmation/${response.orderId}`);
        }, 1500);
      } else if (response?.status === 'PROCESSING') {
        // Order is being processed by IPN
        console.log('Order is being processed...');
        
        if (attempt < MAX_CHECKS) {
          // Check again after interval
          setTimeout(() => checkForOrder(attempt + 1), CHECK_INTERVAL);
        } else {
          // Max attempts reached
          throw new Error('Order processing is taking longer than expected. Please check your orders page.');
        }
      } else {
        // Order not found and not processing
        throw new Error('Order not found. IPN may have failed.');
      }
    } catch (err) {
      console.error('Order check error:', err);

      // const errorMessage = err?.data?.message || 
      //   err?.message || 
      //   'Unable to verify payment status';

      setError('Unable to verify payment status');
      toast.error('Unable to verify payment status');
      setIsProcessing(false);
    }
  };

  const handleRetry = async () => {
    if (retryCount >= MAX_RETRIES) {
      toast.error('Maximum retry attempts reached. Please contact support.');
      return;
    }

    setRetryCount((prev) => prev + 1);
    setError(null);
    setIsProcessing(true);

    try {
      toast.info(`Retrying... Attempt ${retryCount + 1} of ${MAX_RETRIES}`);
      
      const response = await retryPayment({ 
        transactionId: transactionId!,
        val_id: valId!
      }).unwrap();

      if (response?.orderId) {
        setOrderId(response.orderId);
        toast.success('Payment confirmed! Order created.');
        sessionStorage.removeItem('pendingOrder');
        
        setTimeout(() => {
          router.push(`/order-confirmation/${response.orderId}`);
        }, 1500);
      } else {
        throw new Error('Retry failed to create order');
      }
    } catch (err) {
      console.error('Retry error:', err);
      // const errorMessage = err?.data?.message || err?.message || 'Retry failed';
      setError('Retry failed');
      toast.error('Retry failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContactSupport = () => {
    if (navigator.clipboard && transactionId) {
      navigator.clipboard.writeText(transactionId);
      toast.success('Transaction ID copied to clipboard');
    }
    router.push(`/support?transactionId=${transactionId}`);
  };

  const handleCheckOrders = () => {
    router.push('/my-orders');
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
              {retryCount > 0 ? 'Retrying...' : 'Verifying your payment...'}
            </Typography>
            <Typography color="text.secondary">
              Please wait while we confirm your order.
              {!retryCount && ' This may take a few moments.'}
            </Typography>
            {retryCount > 0 && (
              <Typography variant="caption" color="warning.main" fontWeight={500}>
                Attempt {retryCount} of {MAX_RETRIES}
              </Typography>
            )}
            <Alert severity="info" sx={{ width: '100%', mt: 2 }}>
              Do not close this page. We are checking your payment status...
            </Alert>
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

            <Alert severity="info" sx={{ width: '100%' }}>
              Your payment was successful, but we are having trouble confirming your order. 
              Please check your orders page or contact support.
            </Alert>

            <Stack direction="row" spacing={2} width="100%" mt={2}>
              {retryCount < MAX_RETRIES && valId && (
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
                onClick={handleCheckOrders}
              >
                Check My Orders
              </Button>
            </Stack>

            <Button
              variant="text"
              onClick={handleContactSupport}
              sx={{ mt: 1 }}
            >
              Contact Support
            </Button>

            <Button variant="text" onClick={() => router.push('/')} sx={{ mt: 1 }}>
              Return to Home
            </Button>
          </Stack>
        </Paper>
      </Container>
    );
  }

  return null;
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Stack spacing={3} alignItems="center">
              <CircularProgress size={60} />
              <Typography variant="h5">Loading payment details...</Typography>
            </Stack>
          </Paper>
        </Container>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}