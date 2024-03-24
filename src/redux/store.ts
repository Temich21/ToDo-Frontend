import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { rootReducer } from './rootReducer'
import { authAPI } from './services/AuthServices'
import { refreshAPI } from './services/RefreshServices'
import { userAPI } from './services/UserServices'
import { todoAPI } from './services/ToDoServices'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authAPI.middleware)
      .concat(refreshAPI.middleware)
      .concat(userAPI.middleware)
      .concat(todoAPI.middleware)
})

export default store

export type AppStore = typeof store

export type AppDispatch = AppStore['dispatch']
export const useAppDispatch: () => AppDispatch = useDispatch

export type RootState = ReturnType<AppStore['getState']>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector