import { tagTypes } from "../tagTypes"
import { baseApi } from "./baseApi"


// NOTE: these are the _SAME_ API reference!
const extendedApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProduct: build.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        "contentType": "application/json",
        data
      }),
      invalidatesTags: [tagTypes.product]
    }),
  }),
  overrideExisting: false,
})

export const { useCreateProductMutation } = extendedApi