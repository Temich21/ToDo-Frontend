export type Participant = {
    _id: string
    email: string
    name: string
}

export interface GroupToDoDataResponse {
    _id: string
    author: Participant
    title: string
    description: string
    deadline: string
    priority: number
    completed: boolean
}

export interface GroupToDoDataRequest {
    author: {
        _id: string
        email: string
        name: string
    }
    title: string
    description: string
    deadline: string
    priority: number
    completed: boolean
}

export interface GroupToDoAddRequest {
    requestId: string
    newToDo: GroupToDoDataRequest
}

export interface GroupToDoCreateRequest {
    title: string,
    createdBy: string,
    participants: Participant[]
}

export interface GroupToDoEditRequest {
    requestId: string
    editedTodo: GroupToDoDataResponse
}

export interface GroupToDoDeleteRequest {
    requestId: string
    todoId: string
}

export interface GroupToDoDataInfo {
    _id: string
    title: string
    participants: Participant[]
    completedToDo: number
    uncompletedToDo: number
}
