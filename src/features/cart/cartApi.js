import { apiSlice } from "../../services/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    addToCart: builder.mutation({
      query: (data) => ({
        url: "/cart/add/",
        method: "POST",
        body: data,
      }),
    }),

    getCart: builder.query({
      query: () => "/cart/view/",
      providesTags: ["Cart"],
    }),
    getCheckoutSummary: builder.query({
      query: () => "/orders/checkout-summary/",
      providesTags: ["Cart"],
    }),

  }),
});

export const { useAddToCartMutation,useGetCartQuery,useGetCheckoutSummaryQuery} = cartApi;