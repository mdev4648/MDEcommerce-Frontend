import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api/",
  prepareHeaders: (headers, { getState }) => {

    const token = getState().auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {

  let result = await baseQuery(args, api, extraOptions);

  // If token expired
  if (result?.error?.status === 401) {

    const refreshToken = api.getState().auth.refresh;

    if (refreshToken) {

      const refreshResult = await baseQuery(
        {
          url: "token/refresh/",
          method: "POST",
          body: { refresh: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult?.data) {

        api.dispatch(
          setCredentials({
            access: refreshResult.data.access,
            refresh: refreshToken,
          })
        );

        // retry original request
        result = await baseQuery(args, api, extraOptions);

      } else {
        api.dispatch(logout());
      }

    } else {
      api.dispatch(logout());
    }
  }

  return result;
};