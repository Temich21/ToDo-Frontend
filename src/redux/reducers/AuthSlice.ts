import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserData } from '../../models/UserData'
import { AuthResponse } from '../../models/AuhtResponse'
import Cookies from "js-cookie"

interface AuthSlice {
    user: UserData
    isAuth: boolean
}

const initialState: AuthSlice = {
    user: {} as UserData,
    isAuth: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state: AuthSlice, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        logout: () => initialState,
        tokenReceived(state, action: PayloadAction<AuthResponse>) {
            state.user = action.payload.user
            state.isAuth = true
            localStorage.setItem('accessToken', action.payload.accessToken)
            Cookies.set('refreshToken', action.payload.refreshToken)
        },
        tokenRemoved(state) {
            localStorage.removeItem('accessToken')
            Cookies.remove('refreshToken')
        }
    },
})

export const { setAuth, logout, tokenReceived, tokenRemoved } = authSlice.actions
export default authSlice.reducer