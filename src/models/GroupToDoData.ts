export interface GroupToDoCreate {
    title: string
    participants: string[]
}

export interface GroupToDoDataResponse {
    _id: string
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

export interface GroupToDoEditRequest {
    requestId: string
    editedTodo: GroupToDoDataResponse
}

export interface GroupToDoDeleteRequest {
    requestId: string
    todoId: string
}
