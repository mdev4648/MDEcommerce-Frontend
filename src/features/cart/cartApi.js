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

    updateCartItem: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/cart/update/${id}/`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),


    removeCartItem: builder.mutation({
      query: (id) => ({
        url: `/cart/remove/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),



  }),
});

export const { useAddToCartMutation,useGetCartQuery,useGetCheckoutSummaryQuery,useUpdateCartItemMutation,useRemoveCartItemMutation,} = cartApi;