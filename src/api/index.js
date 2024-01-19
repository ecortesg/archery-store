import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../state/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

async function baseQueryWithReauth(args, api, extraOptions) {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Send refresh token to get new access token
    console.log("Sending refresh token");
    const refreshToken = api.getState().auth.refreshToken;
    const refreshResult = await baseQuery(
      {
        url: "api/v1/token/refresh/",
        method: "POST",
        body: { refresh: refreshToken },
      },
      api,
      extraOptions
    );
    console.log(refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // Store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // Retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    home: builder.query({
      query: () => "api/v1/home/",
    }),
    productDetails: builder.query({
      query: (productId) => `api/v1/product/${productId}/`,
    }),
    productSearch: builder.query({
      query: (queryParams) =>
        `api/v1/product/search/?page=${queryParams.page}&limit=20&query=${queryParams.query}`,
      serializeQueryArgs: ({ queryArgs }) => {
        const newQueryArgs = { ...queryArgs };
        if (newQueryArgs.page) {
          delete newQueryArgs.page;
        }
        return newQueryArgs;
      },
      merge: (currentCache, newItems) => {
        if (currentCache.results) {
          return {
            ...currentCache,
            ...newItems,
            results: [...currentCache.results, ...newItems.results],
          };
        }
        return newItems;
      },
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "api/v1/token/",
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
    checkout: builder.mutation({
      query: (data) => ({
        url: "api/v1/order/checkout/",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useHomeQuery,
  useProductDetailsQuery,
  useProductSearchQuery,
  useLazyProductSearchQuery,
  useLoginMutation,
  useSignupMutation,
  useAccountQuery,
  useCheckoutMutation,
} = apiSlice;
