import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface EyeState {
    eye: boolean
}

const initialState: EyeState = {
    eye: false,
}

const eyeSlice = createSlice({
    name: 'eye',
    initialState,
    reducers: {
        setEye(state: EyeState, action: PayloadAction<boolean>) {
            state.eye = action.payload
        },
    },
})

export const { setEye } = eyeSlice.actions
export default eyeSlice.reducer