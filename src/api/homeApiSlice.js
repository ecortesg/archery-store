import { apiSlice } from "./api";

export const homeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    carouselImages: builder.query({
      query: () => "api/v1/home/carousel-images/",
    }),
  }),
});

export const { useCarouselImagesQuery } = homeApiSlice;
