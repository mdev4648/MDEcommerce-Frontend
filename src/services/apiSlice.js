// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//   reducerPath: "api", // api is Think of it as naming the department in the database.  So "api" is simply the key name in the Redux store.
//   baseQuery: fetchBaseQuery({ 

//     baseUrl: "http://127.0.0.1:8000/api/",
//     prepareHeaders: (headers /* { getState } */) => { // every request automatically sends token.
//       const token = localStorage.getItem("access");
//       // const token = getState().auth.token;
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
  
//   }),
 
//   tagTypes: ["User"],
//   endpoints: () => ({}),
// });

// export const { useGetProductsQuery } = apiSlice;



import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../features/auth/authSlice";

// Basic baseQuery
const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api/",
  //  baseUrl: "http://10.74.5.81:8000/api/",   //for mobile    python manage.py runserver 0.0.0.0:8000

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;//RTK Query sends the request with those headers.
  },
});

// 🔥 Auto Refresh Logic
const baseQueryWithReauth = async (args, api, extraOptions) => {

  let result = await baseQuery(args, api, extraOptions);

  // If access token expired
  if (result?.error?.status === 401) {

    const refreshToken = api.getState().auth.refresh;

    if (refreshToken) {

      // request new access token
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

        // save new token
        api.dispatch(
          setCredentials({
            access: refreshResult.data.access,
            refresh: refreshToken,
          })
        );

        // retry original request
        result = await baseQuery(args, api, extraOptions);// run the original request again

      } else {

        // refresh token expired
        api.dispatch(logout());

      }

    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

// 🔥 Main API Slice
export const apiSlice = createApi({
  reducerPath: "api", //  Redux store location:  state.api

  baseQuery: baseQueryWithReauth,

  tagTypes: ["User",  "Product","Cart","Order","Wishlist"],

  endpoints: () => ({}),
});