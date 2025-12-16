import { axiosBaseQuery } from '@/utils/axios/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: "process.env.NEXT_PUBLIC_BACKEND_URL" }),
  endpoints: () => ({}),
})
