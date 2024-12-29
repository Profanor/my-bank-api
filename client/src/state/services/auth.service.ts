import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";

export const UserAuthApi = createApi({
    reducerPath: 'UserAuthApi',
    baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
}),
    endpoints: (builder) => ({
    createAccount: builder.mutation({
      query: (credentials) => ({
        url: '/auth/signup',
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const {
    useCreateAccountMutation,
    useLoginMutation,
} = UserAuthApi;