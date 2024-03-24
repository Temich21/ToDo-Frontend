import { createApi } from "@reduxjs/toolkit/query/react"
import { ToDoData } from "../../models/ToDoData"
import baseQueryWithReauth from "./CustomFetchBaseMulti"

export const todoAPI = createApi({
    reducerPath: "todoAPI",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['ToDo'],
    endpoints: (builder) => ({
        getTodos: builder.query<ToDoData[], string>({
            query: (userId) => `todo/${userId}`,
            providesTags: result => ['ToDo']
        }),
        addTodo: builder.mutation({
            query: (todo) => ({
                url: `todo/${todo.userId}`,
                method: 'POST',
                body: todo.newToDo
            }),
            invalidatesTags: ['ToDo']
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

export const { useGetTodosQuery, useAddTodoMutation } = todoAPI