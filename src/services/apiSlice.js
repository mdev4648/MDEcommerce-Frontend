import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // api is Think of it as naming the department in the database.  So "api" is simply the key name in the Redux store.
  baseQuery: fetchBaseQuery({ 

    baseUrl: "http://127.0.0.1:8000/api/",
    prepareHeaders: (headers /* { getState } */) => { // every request automatically sends token.
      const token = localStorage.getItem("access");
      // const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  
  }),
 
  tagTypes: ["User"],
  endpoints: () => ({}),
});

export const { useGetProductsQuery } = apiSlice;