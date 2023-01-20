import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUser } from "../models/IUser";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "https://jsonplaceholder.typicode.com",
  // }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    fetchAllUsers: build.query<IUser[], any>({
      query: (reqParams: any = {limit: 10, page: 1}) => ({
        url: `/users`,
        params: {
          _limit: reqParams.limit,
          _page: reqParams.page,
        },
      }),
      providesTags: (result) => ["User"],
    }),
    createUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/users`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/users/${user.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});
