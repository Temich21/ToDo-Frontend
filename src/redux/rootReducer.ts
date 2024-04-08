import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './reducers/AuthSlice'
import editToDoReducer from './reducers/EditToDoSlice'
import eyeReducer from './reducers/EyeSlice'
import { authAPI } from './services/AuthServices'
import { refreshAPI } from './services/RefreshServices'
import { todoAPI } from './services/ToDoServices'
import { groupToDoAPI } from './services/GroupToDoServices'

export const rootReducer = combineReducers({
    authReducer,
    eyeReducer,
    editToDoReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [refreshAPI.reducerPath]: refreshAPI.reducer,
    [todoAPI.reducerPath]: todoAPI.reducer,
    [groupToDoAPI.reducerPath]: groupToDoAPI.reducer,
})

export type RootState = ReturnType<typeof rootReducer>
