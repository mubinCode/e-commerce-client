import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create order (COD)
    createOrder: builder.mutation({
      query: (orderData) => {
        console.log(orderData);
        return {
        url: "/order/create",
        method: "POST",
        "contentType": "application/json",
        data: orderData,
      }},
      invalidatesTags: [tagTypes.cart, tagTypes.order],
    }),

    // Initiate payment (Online Payment)
    initiatePayment: builder.mutation({
      query: (orderData) => ({
        url: "/order/initiate-payment",
        method: "POST",
        data: orderData,
      }),
    }),

    // Confirm payment after gateway redirect
    confirmPayment: builder.mutation({
      query: (data) => ({
        url: "/order/payment/confirm",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.cart, tagTypes.order],
    }),

    // Retry failed payment
    retryPayment: builder.mutation({
      query: (data) => ({
        url: "/order/payment/retry",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.order],
    }),

    // Get user orders
    getMyOrders: builder.query({
      query: () => ({
        url: "/order/my-orders",
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),

    // Get single order
    getOrder: builder.query({
      query: (orderId) => ({
        url: `/order/${orderId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.order],
    }),

    // Admin: Get failed payments
    getFailedPayments: builder.query({
      query: () => ({
        url: "/order/failed-payments",
        method: "GET",
      }),
      providesTags: [tagTypes.failedPayments],
    }),

    // Admin: Initiate refund
    initiateRefund: builder.mutation({
      query: (data) => ({
        url: "/order/refund",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.failedPayments],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useInitiatePaymentMutation,
  useConfirmPaymentMutation,
  useRetryPaymentMutation,
  useGetMyOrdersQuery,
  useGetOrderQuery,
  useGetFailedPaymentsQuery,
  useInitiateRefundMutation,
} = orderApi;
