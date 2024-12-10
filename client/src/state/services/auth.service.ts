import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const UserAuthApi = createApi({
    reducerPath: 'UserAuthApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.API_BASE_URL}/`,
    }),
    endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
        }),
    }),
  }),
})

export const {
    useLoginMutation,
} = UserAuthApi;