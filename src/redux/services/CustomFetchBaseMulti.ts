import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { ServerUrl } from "../../constants"
import { tokenReceived, logout } from '../reducers/AuthSlice'
import { Mutex } from 'async-mutex'
import { AuthResponse } from '../../models/AuhtResponse'

// create a new mutex
const mutex = new Mutex()

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
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                console.log('sending from CustomFetchBaseMulti')
                const refreshResult = await baseQuery(
                    '/refresh',
                    api,
                    extraOptions
                )
                if (refreshResult.data) {
                    const data = refreshResult.data as AuthResponse
                    api.dispatch(tokenReceived(data))
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    api.dispatch(logout())
                }
            } finally {
                release()
            }
        } else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}

export default baseQueryWithReauth