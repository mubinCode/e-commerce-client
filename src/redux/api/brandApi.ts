import { tagTypes } from "../tagTypes"
import { baseApi } from "./baseApi"

const extendedApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBrand: build.mutation({
      query: (data) => ({
        url: "/brand",
        method: "POST",
        "contentType": "application/json",
        data
      }),
      invalidatesTags: [tagTypes.brand]
    }),
  }),
  overrideExisting: false,
})

export const { useCreateBrandMutation } = extendedApi