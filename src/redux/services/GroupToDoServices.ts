import { createApi } from "@reduxjs/toolkit/query/react"
import baseQueryWithReauth from "./CustomFetchBaseMulti"
import { GroupToDoDataResponse, GroupToDoAddRequest, GroupToDoEditRequest, GroupToDoDeleteRequest, GroupToDoDataInfo, GroupToDoCreateRequest, Participant } from "../../models/GroupToDoData"

export const groupToDoAPI = createApi({
    reducerPath: "groupToDoAPI",
    baseQuery: baseQueryWithReauth,
    tagTypes: ['GroupToDo', 'Group', 'GroupParticipants'],
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
        }),
        getGroups: builder.query<GroupToDoDataInfo[], string>({
            query: (userId) => `groups/${userId}`,
            providesTags: ['Group']
        }),
        createNewGroup: builder.mutation<{ message: string, groupId: string }, GroupToDoCreateRequest>({
            query: (newGroupData) => ({
                url: `group/create`,
                method: 'POST',
                body: newGroupData
            }),
            invalidatesTags: ['Group']
        }),
        getRequiredUsers: builder.query<Participant[], string>({
            query: (emailOrName) => ({
                url: `groups/users`,
                method: 'GET',
                params: {
                    emailOrName
                }
            }),
        }),
        getUsersList: builder.query<Participant[], string>({
            query: (groupId) => ({
                url: `group/${groupId}/users`,
                method: 'GET',
            }),
            providesTags: ['GroupParticipants']
        }),
        leaveGroup: builder.mutation<void, { groupId: string; userId: string }>({
            query: ({ groupId, userId }) => ({
                url: `group/${groupId}/leave`,
                method: 'PATCH',
                body: { userId }, 
            }),
            invalidatesTags: ['Group']
        }),
        addNewParticipant: builder.mutation<void, { groupId: string; newParticipant: Participant }>({
            query: ({ groupId, newParticipant }) => ({
                url: `group/${groupId}/new-participant`,
                method: 'POST',
                body: newParticipant, 
            }),
            invalidatesTags: ['GroupParticipants']
        }),
    }),
})

export const {
    useGetGroupTodosQuery,
    useAddGroupTodoMutation,
    useEditToDoMutation,
    useDeleteToDoMutation,
    useGetGroupsQuery,
    useCreateNewGroupMutation,
    useGetRequiredUsersQuery,
    useGetUsersListQuery,
    useLeaveGroupMutation,
    useAddNewParticipantMutation
} = groupToDoAPI