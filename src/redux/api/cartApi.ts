import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCart: build.mutation({
      query: (data) => {
        return {
          url: "/cart",
          method: "POST",
          contentType: "application/json",
          data,
        };
      },
      invalidatesTags: [tagTypes.cart],
    }),
    getSelectedCart: build.mutation({
      query: (data) => ({
        url: "/variant-attribute/select-cart",
        method: "Post",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: [tagTypes.cart],
    }),
    getCart: build.query({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
      providesTags: [tagTypes.cart],
    }),
    updateCart: build.mutation({
      query: ({ variantId, quantity }) => {
        return         {
        url: `/cart/${variantId}`,
        method: "PATCH",
        data: { quantity },
      }},
      invalidatesTags: [tagTypes.cart],
    }),
    deleteCart: build.mutation({
      query: (variantId) => ({
        url: `/cart/${variantId}`,
        method: "DELETE"
      }),
      invalidatesTags: [tagTypes.cart],
    }),
  }),
  overrideExisting: false,
});
// <CartItem[], void>
export const {
  useCreateCartMutation,
  useGetCartQuery,
  useGetSelectedCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation
} = cartApi;
