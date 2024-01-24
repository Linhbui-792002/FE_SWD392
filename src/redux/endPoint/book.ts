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

export const bookApi = createApi({
  reducerPath: "books",
  tagTypes: ["BooksTag"],
  baseQuery: baseQuery,
  endpoints: (build) => ({
    getListBook: build.query({
      query: (param: QueryParams) => {
        const string = objectToUrlParams(param);
        return {
          url: `/books?${string}`,
          method: "GET",
        };
      },
      providesTags: ["BooksTag"],
      transformResponse: (res: any) => res?.data,
    }),
    addBook: build.mutation({
      query: (body) => {
        return {
          url: "/books",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["BooksTag"],
    }),
    getOneBook: build.query({
      query: (id) => {
        return {
          url: `/books/${id}`,
          method: "GET",
        };
      },
      transformResponse: (res: any) => res?.data,
    }),
    editOneBook: build.mutation({
      query(data) {
        return {
          url: "/books",
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["BooksTag"],
    }),
    deleteOneBook: build.mutation({
      query(id: string) {
        return {
          url: `/customers/${id}`,
          method: "DELETE",
          body: id,
        };
      },
      invalidatesTags: ["BooksTag"],
    }),
  }),
});

export const {
  useAddBookMutation,
  useDeleteOneBookMutation,
  useEditOneBookMutation,
  useGetListBookQuery,
  useGetOneBookQuery,
} = bookApi;
