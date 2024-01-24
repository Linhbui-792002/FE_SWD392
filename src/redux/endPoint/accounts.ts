import { createApi } from "@reduxjs/toolkit/query/react";
import { objectToUrlParams } from "../../utils/convertData";
import { baseQuery } from "../api/index";

type QueryParams = {
  pageIndex?: number;
  pageSize?: number;
  status?: number | string;
  roleId?: number | string;
  name?: number | string;
};

export const accountApi = createApi({
  reducerPath: "users",
  tagTypes: ["UsersTag"],
  baseQuery: baseQuery,
  endpoints: (build) => ({
    getListUser: build.query({
      query: (param: QueryParams) => {
        const string = objectToUrlParams(param);
        return {
          url: `/customers?${string}`,
        };
      },
      providesTags: ["UsersTag"],
      transformResponse: (res: any) => res?.data,
    }),
    getOneUser: build.mutation({
      query: (id: string) => {
        return {
          url: `/customers/${id}`,
          method: "GET",
        };
      },
      transformResponse: (res: any) => {
        return res.data as any;
      },
    }),
    addUsers: build.mutation({
      query: (body) => {
        return {
          url: "/customers",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["UsersTag"],
    }),
    editOneUsers: build.mutation({
      query(data) {
        return {
          url: "/customers",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["UsersTag"],
    }),
    deleteOneUsers: build.mutation({
      query(id) {
        return {
          url: `/customers/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["UsersTag"],
    }),
  }),
});

export const {
  useAddUsersMutation,
  useDeleteOneUsersMutation,
  useEditOneUsersMutation,
  useGetListUserQuery,
  useGetOneUserMutation,
} = accountApi;
