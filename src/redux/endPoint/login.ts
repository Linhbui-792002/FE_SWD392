import { api, baseQuery } from '../api/index';
import { FetchBaseQueryError, createApi } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';

export const loginApi = createApi({
    reducerPath: 'loginApi',
    tagTypes: ['Login'],
    baseQuery: baseQuery,
    endpoints: (build) => ({
        login: build.mutation<ApiResponseLogin<any>, any>({
            query: (queryArg: any) => ({
                url: '/login',
                method: 'POST',
                body: queryArg,
            }),
            transformResponse: (res: any) => {
                return res
            },
        }),
    })

})

// export interface DataLogin {
//     accessToken: string;
//     tokentType: string;
//     usernameOrEmail: string;
// }

export interface ApiResponseLogin<T> {
    status: boolean;
    data: T;
    error: string | null;
    statusCode: number;
    message: string;
}


export interface LoginUserApiResponse {
    data?: ApiResponseLogin<any>;
    error?: FetchBaseQueryError | SerializedError;
}


export const { useLoginMutation } = loginApi