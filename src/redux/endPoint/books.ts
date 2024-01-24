import { createApi } from '@reduxjs/toolkit/query/react';
import { objectToUrlParams } from '../../utils/convertData';
import { baseQuery } from '../api/index';

type QueryParams = {
    name: string;
};

export const booksApi = createApi({
    reducerPath: 'books',
    tagTypes: ['BooksTag'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getListBooks: build.query({
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
        getListBook: build.mutation({
            query: (param: QueryParams) => {
                const string = objectToUrlParams(param);
                return {
                    url: `/books?${string}`,
                };
            },
            transformResponse: (res: any) => res?.data,
        }),
        getOneBook: build.mutation({
            query: (id: string) => {
                return {
                    url: `/books/${id}`,
                    method: 'GET',
                };
            },
            transformResponse: (res: any) => {
                return res.data as any
            }
        }),
        addBook: build.mutation({
            query: (body) => {
                return {
                    url: '/books',
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['BooksTag'],
        }),
        editOneBook: build.mutation({
            query(data) {
                return {
                    url: '/books',
                    method: 'PATCH',
                    body: data,
                };
            },
            invalidatesTags: ['BooksTag'],
        }),
        deleteOneBook: build.mutation({
            query(id) {
                return {
                    url: `/books/${id}`,
                    method: 'DELETE',
                    body: id,
                };
            },
            invalidatesTags: ['BooksTag'],
        }),

    }),
});

export const {
    useAddBookMutation,
    useDeleteOneBookMutation,
    useEditOneBookMutation,
    useGetListBookMutation,
    useGetListBooksQuery,
    useGetOneBookMutation,
} = booksApi;
