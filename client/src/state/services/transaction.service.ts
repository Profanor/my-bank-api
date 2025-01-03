import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TransactionApi = createApi({
    reducerPath: 'TransactionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
    }),
    endpoints: (builder) => ({
    getBalance: builder.query({
      query: (id) => `/transactions/balance/${id}`,
      
    }),
 }),
});

export const {
    useGetBalanceQuery,
} = TransactionApi