import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ServerUrl } from "../../constants"
import { AuthResponse } from "../../models/AuhtResponse"

export const refreshAPI = createApi({
    reducerPath: "refreshAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/api`,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        refreshUser: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: 'refresh',
                method: 'GET',
            }),
        }),
    }),
})

export const { useRefreshUserMutation } = refreshAPI