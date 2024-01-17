import { apiSlice } from "./api";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    bestSellers: builder.query({
      query: () => "api/v1/product/best-sellers/",
    }),
    newArrivals: builder.query({
      query: () => "api/v1/product/new-arrivals/",
    }),
    saleItems: builder.query({
      query: () => "api/v1/product/on-sale/",
    }),
    productDetails: builder.query({
      query: (productId) => `api/v1/product/${productId}/`,
    }),
    relatedProducts: builder.query({
      query: (productId) => `api/v1/product/${productId}/related/`,
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
  }),
});

export const {
  useBestSellersQuery,
  useNewArrivalsQuery,
  useSaleItemsQuery,
  useProductDetailsQuery,
  useRelatedProductsQuery,
  useProductSearchQuery,
  useLazyProductSearchQuery,
} = productApiSlice;
