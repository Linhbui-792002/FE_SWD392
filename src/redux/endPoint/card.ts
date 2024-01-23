import { createApi } from '@reduxjs/toolkit/query/react';
import { objectToUrlParams } from '../../utils/convertData';
import { baseQuery } from '../api/index';



export const cartApi = createApi({
    reducerPath: 'cart',
    tagTypes: ['CartTag'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        getListCart: build.mutation({
            query: (id) => {
                return {
                    url: `/cart/${id}`,
                    method: 'GET',
                };
            },
            transformResponse: (res: any) => res?.data,
        }),
        addCart: build.mutation({
            query: ({ body, id }) => {
                return {
                    url: `cart/${id ? id : ''}`,
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['CartTag'],
        }),
        updateCartItem: build.mutation({
            query: (body) => {
                return {
                    url: `cart/updateCartItem`,
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['CartTag'],
        }),
        deleteCartItem: build.mutation({
            query: (body) => {
                return {
                    url: `cart/deleteCartItem`,
                    method: 'POST',
                    body,
                };
            },
            invalidatesTags: ['CartTag'],
        }),
        deleteOneCart: build.mutation({
            query(id: number) {
                return {
                    url: `/cart/${id}`,
                    method: 'DELETE',
                    body: id,
                };
            },
            invalidatesTags: ['CartTag'],
        }),

    }),
});

export const {
    useAddCartMutation,
    useDeleteOneCartMutation,
    useGetListCartMutation,
    useUpdateCartItemMutation,
    useDeleteCartItemMutation,
} = cartApi;
