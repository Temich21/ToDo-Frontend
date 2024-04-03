import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface EditToDoSlice {
    editingId: string
}

const initialState: EditToDoSlice = {
    editingId: ''
}

const editToDoSlice = createSlice({
    name: 'editToDo',
    initialState,
    reducers: {
        setEditingId(state: EditToDoSlice, action: PayloadAction<string>) {
            state.editingId = action.payload
        }
    },
})

export const { setEditingId } = editToDoSlice.actions
export default editToDoSlice.reducer