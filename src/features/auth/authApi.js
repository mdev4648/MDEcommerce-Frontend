import { apiSlice } from "../../services/apiSlice";

export const authApi = apiSlice.injectEndpoints({   // Your apiSlice is the main API engine. Feature APIs plug into it.
  endpoints: (builder) => ({
    
    registerUser: builder.mutation({
      query: (data) => ({
        url: "users/register/",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "token/",
        method: "POST",
        body: data,
      }),
    }),

    getProfile: builder.query({
      query: () => ({
        url: "users/profile/",
        method: "GET",
      }),
    }),

  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetProfileQuery,
} = authApi;