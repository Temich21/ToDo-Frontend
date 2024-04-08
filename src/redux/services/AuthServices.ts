import { createApi } from "@reduxjs/toolkit/query/react"
import { AuthResponse } from "../../models/AuhtResponse"
import { AuhtLoginRequest, AuhtRegistrationRequest } from "../../models/AuthRequest"
import baseQueryWithReauth from "./CustomFetchBaseMulti"

export const authAPI = createApi({
    reducerPath: "authAPI",
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        loginUser: builder.mutation<AuthResponse, Partial<AuhtLoginRequest>>({
            query: (user) => ({
                url: `login`,
                method: 'POST',
                body: user,
            }),
        }),
        registrateUser: builder.mutation<AuthResponse, Partial<AuhtRegistrationRequest>>({
            query: (user) => ({
                url: `registration`,
                method: 'POST',
                body: user,
            }),
        }),
        refreshUser: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: 'refresh',
                method: 'GET',
            }),
        }),
        logoutUser: builder.mutation<{ acknowledged: string, deletedCount: number }, void>({
            query: () => ({
                url: 'logout',
                method: 'GET',
            }),
        }),
    }),
})

export const { useLoginUserMutation, useRegistrateUserMutation, useRefreshUserMutation, useLogoutUserMutation } = authAPI