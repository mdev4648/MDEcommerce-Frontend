import { apiSlice } from "../../services/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getProducts: builder.query({
      query: () => ({
        url: "products/",
      }),
      providesTags: ["Product"],
    }),

    // getProductDetail: builder.query({
    //   query: (id) => ({
    //     url: `products/${id}/`,
    //   }),
    // }),

    getProductById: builder.query({
        query: (id) => `/products/${id}/`,
      }),

  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery, // why when i try to use getProductDetail is error
} = productApi;