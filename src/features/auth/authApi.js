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
      providesTags: ["User"], // 🔥 important
    }),

  refreshToken: builder.mutation({  // use this if we want apply Persisten Login and wrappe app with PersistanLogin
  query: (refresh) => ({
    url: "token/refresh/",
    method: "POST",
    body: { refresh },
  }),
}),

requestOtp: builder.mutation({
  query: (data) => ({
    url: "users/password/request-otp/",
    method: "POST",
    body: data,
  }),
}),

verifyOtp: builder.mutation({
  query: (data) => ({
    url: "users/password/verify-otp/",
    method: "POST",
    body: data,
  }),
}),

resetPassword: builder.mutation({
  query: (data) => ({
    url: "users/password/reset/",
    method: "POST",
    body: data,
  }),
}),

  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetProfileQuery,
  useRefreshTokenMutation,
  useRequestOtpMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation
} = authApi;