import { createApi } from "@reduxjs/toolkit/query/react"
import { ToDoDataResponse, ToDoAddRequest, ToDoDeleteRequest, ToDoEditRequest } from "../../models/ToDoData"
import baseQueryWithReauth from "./CustomFetchBaseMulti"

// Можно ли напрямую вызывать userId из редакса тут?
export const todoAPI = createApi({
    reducerPath: "todoAPI",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['ToDo'],
    endpoints: (builder) => ({
        getTodos: builder.query<ToDoDataResponse[], string>({
            query: (userId) => `todo/get/${userId}`,
            providesTags: ['ToDo']
        }),
        addTodo: builder.mutation<void, ToDoAddRequest>({
            query: ({ requestId, newToDo }) => ({
                url: `todo/add/${requestId}`,
                method: 'POST',
                body: newToDo
            }),
            invalidatesTags: ['ToDo']
        }),
        editToDo: builder.mutation<void, ToDoEditRequest>({
            query: ({ requestId, editedTodo }) => ({
                url: `todo/edit/${requestId}`,
                method: 'PUT',
                body: editedTodo
            }),
            invalidatesTags: ['ToDo']
        }),
        deleteToDo: builder.mutation<void, ToDoDeleteRequest>({
            query: ({ requestId, todoId }) => ({
                url: `todo/delete/${requestId}/${todoId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['ToDo']
        }),
        getAllToDos: builder.query<ToDoDataResponse[], string>({
            query: (userId) => `todo/all/${userId}`,
            providesTags: ['ToDo']
        }),
    }),
})

export const { useGetTodosQuery, useAddTodoMutation, useEditToDoMutation, useDeleteToDoMutation, useGetAllToDosQuery } = todoAPI