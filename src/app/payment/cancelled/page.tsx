// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Container, Typography, Button, Paper, Stack, Box } from '@mui/material';
// import { toast } from 'sonner';
// import InfoIcon from '@mui/icons-material/Info';

// export default function PaymentCancelledPage() {
//   const router = useRouter();

//   useEffect(() => {
//     toast.info('Payment was cancelled');
//   }, []);

//   return (
//     <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
//       <Paper elevation={3} sx={{ p: 4 }}>
//         <Stack spacing={3} alignItems="center">
//           <Box
//             sx={{
//               width: 80,
//               height: 80,
//               borderRadius: '50%',
//               bgcolor: 'warning.light',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             <InfoIcon sx={{ fontSize: 60, color: 'warning.main' }} />
//           </Box>
//           <Typography variant="h4" fontWeight={600}>
//             Payment Cancelled
//           </Typography>
//           <Typography color="text.secondary">
//             You cancelled the payment process. Your cart items are still saved.
//           </Typography>

//           <Stack direction="row" spacing={2} width="100%" mt={2}>
//             <Button variant="contained" fullWidth onClick={() => router.push('/checkout')}>
//               Return to Checkout
//             </Button>
//             <Button variant="outlined" fullWidth onClick={() => router.push('/')}>
//               Continue Shopping
//             </Button>
//           </Stack>
//         </Stack>
//       </Paper>
//     </Container>
//   );
// }

'use client';

import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Typography, Button, Paper, Stack, Box, CircularProgress } from '@mui/material';
import { toast } from 'sonner';
import InfoIcon from '@mui/icons-material/Info';

function PaymentCancelledContent() {
  const router = useRouter();

  useEffect(() => {
    toast.info('Payment was cancelled');
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
              bgcolor: 'warning.light',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <InfoIcon sx={{ fontSize: 60, color: 'warning.main' }} />
          </Box>
          <Typography variant="h4" fontWeight={600}>
            Payment Cancelled
          </Typography>
          <Typography color="text.secondary">
            You cancelled the payment process. Your cart items are still saved.
          </Typography>

          <Stack direction="row" spacing={2} width="100%" mt={2}>
            <Button variant="contained" fullWidth onClick={() => router.push('/checkout')}>
              Return to Checkout
            </Button>
            <Button variant="outlined" fullWidth onClick={() => router.push('/')}>
              Continue Shopping
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}

export default function PaymentCancelledPage() {
  return (
    <Suspense
      fallback={
        <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
          <CircularProgress />
        </Container>
      }
    >
      <PaymentCancelledContent />
    </Suspense>
  );
}