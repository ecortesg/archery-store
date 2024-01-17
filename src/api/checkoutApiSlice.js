import { apiSlice } from "./api";

export const checkoutApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (data) => ({
        url: "api/v1/order/checkout/",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { useCheckoutMutation } = checkoutApiSlice;
