'use client';

import { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material';
import { toast } from 'sonner';
import {
  useGetFailedPaymentsQuery,
  useInitiateRefundMutation,
} from '@/redux/api/orderApi';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

interface FailedPayment {
  transactionId: string;
  userId: string;
  totalAmount: number;
  timestamp: number;
  error: string;
  failedAt: string;
  orderData: {
    contactNumber: string;
    deliveryType: string;
    city?: string;
    address?: string;
  };
  retryCount: number;
}

export default function FailedPaymentsPage() {
  const { data: failedPayments, isLoading, refetch } = useGetFailedPaymentsQuery(undefined);
  const [initiateRefund] = useInitiateRefundMutation();

  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<FailedPayment | null>(null);
  const [refundReason, setRefundReason] = useState('');
  const [isRefunding, setIsRefunding] = useState(false);

  const handleCopyTransactionId = (transactionId: string) => {
    navigator.clipboard.writeText(transactionId);
    toast.success('Transaction ID copied to clipboard');
  };

  const handleOpenRefundDialog = (payment: FailedPayment) => {
    setSelectedPayment(payment);
    setRefundReason('');
    setRefundDialogOpen(true);
  };

  const handleCloseRefundDialog = () => {
    setRefundDialogOpen(false);
    setSelectedPayment(null);
    setRefundReason('');
  };

  const handleInitiateRefund = async () => {
    if (!selectedPayment || !refundReason.trim()) {
      toast.error('Please provide a refund reason');
      return;
    }

    setIsRefunding(true);

    try {
      await initiateRefund({
        transactionId: selectedPayment.transactionId,
        reason: refundReason,
      }).unwrap();

      toast.success('Refund initiated successfully');
      handleCloseRefundDialog();
      refetch();
    } catch (error) {
      console.error('Refund error:', error);
      toast.error('Failed to initiate refund');
    } finally {
      setIsRefunding(false);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const formatCurrency = (amount: number) => {
    return `৳${amount.toFixed(2)}`;
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight={600}>
          Failed Payments
        </Typography>
        <Button
          variant="outlined"
          startIcon={<RefreshIcon />}
          onClick={() => refetch()}
        >
          Refresh
        </Button>
      </Stack>

      {!failedPayments || failedPayments.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">
            No failed payments found
          </Typography>
        </Paper>
      ) : (
        <>
          <Alert severity="info" sx={{ mb: 3 }}>
            These payments were successfully processed but failed during order creation.
            Customers were charged but did not receive their orders. Action required.
          </Alert>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Retry Count</TableCell>
                  <TableCell>Error</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {failedPayments.map((payment: FailedPayment) => (
                  <TableRow key={payment.transactionId}>
                    <TableCell>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography
                          variant="body2"
                          sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
                        >
                          {payment.transactionId.substring(0, 20)}...
                        </Typography>
                        <Tooltip title="Copy Transaction ID">
                          <IconButton
                            size="small"
                            onClick={() => handleCopyTransactionId(payment.transactionId)}
                          >
                            <ContentCopyIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Typography fontWeight={600}>
                        {formatCurrency(payment.totalAmount)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {formatDate(payment.timestamp)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`${payment.retryCount || 0} attempts`}
                        size="small"
                        color={payment.retryCount >= 3 ? 'error' : 'warning'}
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title={payment.error}>
                        <Typography
                          variant="body2"
                          color="error"
                          sx={{
                            maxWidth: 200,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {payment.error}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<MoneyOffIcon />}
                        onClick={() => handleOpenRefundDialog(payment)}
                      >
                        Refund
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Refund Dialog */}
      <Dialog
        open={refundDialogOpen}
        onClose={handleCloseRefundDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Initiate Refund</DialogTitle>
        <DialogContent>
          {selectedPayment && (
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Alert severity="warning">
                This will initiate a refund for the customer through SSL Commerz.
                This action cannot be undone.
              </Alert>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Transaction ID:
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}
                >
                  {selectedPayment.transactionId}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Amount to Refund:
                </Typography>
                <Typography variant="h6" color="error">
                  {formatCurrency(selectedPayment.totalAmount)}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Error Reason:
                </Typography>
                <Alert severity="error" sx={{ fontSize: '0.875rem' }}>
                  {selectedPayment.error}
                </Alert>
              </Box>

              <TextField
                label="Refund Reason (required)"
                multiline
                rows={3}
                fullWidth
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                placeholder="e.g., Order creation failed due to insufficient stock"
                required
              />
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRefundDialog} disabled={isRefunding}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleInitiateRefund}
            disabled={isRefunding || !refundReason.trim()}
          >
            {isRefunding ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                Processing...
              </>
            ) : (
              'Initiate Refund'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}