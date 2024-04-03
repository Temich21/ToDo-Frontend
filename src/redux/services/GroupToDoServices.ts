import { createApi } from "@reduxjs/toolkit/query/react"
import baseQueryWithReauth from "./CustomFetchBaseMulti"
import { GroupToDoDataResponse, GroupToDoAddRequest, GroupToDoEditRequest, GroupToDoDeleteRequest } from "../../models/GroupToDoData"

// Можно ли напрямую вызывать userId из редакса тут?
export const groupToDoAPI = createApi({
    reducerPath: "groupToDoAPI",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['GroupToDo'],
    endpoints: (builder) => ({
        getGroupTodos: builder.query<GroupToDoDataResponse[], string>({
            query: (groupId) => `group/${groupId}`,
            providesTags: ['GroupToDo']
        }),
        addGroupTodo: builder.mutation<void, GroupToDoAddRequest>({
            query: ({ requestId, newToDo }) => ({
                url: `group/${requestId}`,
                method: 'POST',
                body: newToDo
            }),
            invalidatesTags: ['GroupToDo']
        }),
        editToDo: builder.mutation<void, GroupToDoEditRequest>({
            query: ({ requestId, editedTodo }) => ({
                url: `group/${requestId}`,
                method: 'PUT',
                body: editedTodo
            }),
            invalidatesTags: ['GroupToDo']
        }),
        deleteToDo: builder.mutation<void, GroupToDoDeleteRequest>({
            query: ({ requestId, todoId }) => ({
                url: `group/${requestId}/${todoId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['GroupToDo']
        })
    }),
})

export const { useGetGroupTodosQuery, useAddGroupTodoMutation, useEditToDoMutation, useDeleteToDoMutation } = groupToDoAPI