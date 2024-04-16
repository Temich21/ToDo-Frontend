export interface ToDoDataResponse {
    _id: string
    groupTitle?: string
    title: string
    description: string
    deadline: string
    priority: number
    completed: boolean
}

export interface ToDoDataRequest {
    title: string
    description: string
    deadline: string
    priority: number
    completed: boolean
}

export interface ToDoAddRequest {
    requestId: string
    newToDo: ToDoDataRequest
}

export interface ToDoEditRequest {
    requestId: string
    editedTodo: ToDoDataResponse
}

export interface ToDoDeleteRequest {
    requestId: string
    todoId: string
}
