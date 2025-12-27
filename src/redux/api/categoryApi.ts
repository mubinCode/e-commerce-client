import { tagTypes } from "../tagTypes"
import { baseApi } from "./baseApi"


// NOTE: these are the _SAME_ API reference!
const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        "contentType": "multipart/form-data",
        data
      }),
      invalidatesTags: [tagTypes.category]
    }),
    getAllCategories: build.query({
      query: () => ({
        url: "/category",
        method: "GET"
      }),
      providesTags: [tagTypes.category]
    }),
    deleteCategory: build.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: [tagTypes.category]
    }),
  }),
  overrideExisting: false,
})

export const { useCreateCategoryMutation, useGetAllCategoriesQuery, useDeleteCategoryMutation } = categoryApi