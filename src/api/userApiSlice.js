import { apiSlice } from "./api";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "api/token/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "api/v1/user/register/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    account: builder.query({
      query: () => "api/v1/user/",
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useAccountQuery } =
  userApiSlice;
