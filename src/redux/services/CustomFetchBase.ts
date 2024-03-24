import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { ServerUrl } from "../../constants"
import { tokenReceived, logout } from '../reducers/AuthSlice'
import { AuthResponse } from '../../models/AuhtResponse'

const baseQuery = fetchBaseQuery({
    baseUrl: `${ServerUrl}/api`,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error && result.error.status === 401) {
        console.log('sending refresh token')
        const refreshResult = await baseQuery('/refresh', api, extraOptions)
        console.log(refreshResult)
        if (refreshResult?.data) {
            const data = refreshResult.data as AuthResponse
            api.dispatch(tokenReceived(data))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logout())
        }
    }
    return result
}

export default baseQueryWithReauth


