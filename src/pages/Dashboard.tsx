import { RootState, useAppDispatch, useAppSelector } from "../redux/store"
import { logout, tokenRemoved } from '../redux/reducers/AuthSlice'
import { useLogoutUserMutation } from '../redux/services/AuthServices'
import { useGetTodosQuery, useAddTodoMutation } from '../redux/services/ToDoServices'
import { ToDoData } from "../models/ToDoData"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { v4 as uuidv4 } from 'uuid'

function Dashboard() {
    const { isAuth, user } = useAppSelector((state: RootState) => state.authReducer)
    const dispatch = useAppDispatch()

    const [logoutUser] = useLogoutUserMutation()

    const { data: todos } = useGetTodosQuery(user.id)
    const [addToDo] = useAddTodoMutation()

    const [newTodo, setNewTodo] = useState('')

    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logoutUser()
            dispatch(logout())
            dispatch(tokenRemoved())
            toast.success("Logout successful")
            navigate('/auth')
        } catch (e) {
            console.log(e)
        }
    }

    const handleAddToDo = async (todoTitle: string) => {
        try {
            const newTodoObj = {
                id: uuidv4(),
                title: todoTitle
            }
            await addToDo({userId: user.id, newToDo: newTodoObj}, )
        } catch (e) {
            console.log(e)
        }
    }

    // const handleToDoList = async () => {
    //     try {
    //         const response = await getToDo(user.id).unwrap()
    //         setTodo(response)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    // useEffect(() => {

    // }, [])

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>{isAuth ? `User ${user.email} is autorised` : 'PLEASE AUTHORISE!'}</h2>
            <h2>{user.isActivated ? `User was confirmed by email` : 'PLEASE ACTIVATE YOUR ACCOUNT!'}</h2>
            <button
                className="text-sm text-black bg-gray-400 p-2 mr-4 rounded-lg"
                onClick={handleLogout}
            >
                Logout
            </button>
            <input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <div>
                <button onClick={() => handleAddToDo(newTodo)}>Add ToDo</button>
            </div>
            {todos && todos.map(todo => (
                <div key={todo.id}>{todo.title}</div>
            ))}
        </div>
    );
}

export default Dashboard;