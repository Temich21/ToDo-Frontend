import { createApi } from "@reduxjs/toolkit/query/react"
import { UserData } from "../../models/UserData"
import baseQueryWithReauth from "./CustomFetchBaseMulti"

export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getLinks: builder.mutation<UserData[], void>({
            query: () => 'users',
        }),
        // getUser: builder.mutation<UserResponse, Partial<User>>({
        //     query: (user) => ({
        //         url: `registration`,
        //         method: 'POST',
        //         body: user,
        //     }),
        // }),
        // createUser: builder.mutation<UserResponse, Partial<User>>({
        //     query: (user) => ({
        //         url: `login`,
        //         method: 'POST',
        //         body: user,
        //     }),
        // }),
    }),
})

export const { useGetLinksMutation } = userAPI