import { RootState, useAppSelector } from "../redux/store"
import { useGetTodosQuery, useAddTodoMutation, useDeleteToDoMutation, useEditToDoMutation } from '../redux/services/ToDoServices'
import ToDoInputForm from "../components/ToDoInputForm/ToDoInputForm"
import ToDoCard from "../components/ToDoCard/ToDoCard"
import ToDoInputEdit from "../components/ToDoInputEdit/ToDoInputEdit"
import Loading from "../components/Loading/Loading"

function PersonalToDo() {
    const { user } = useAppSelector((state: RootState) => state.authReducer)
    const { editingId } = useAppSelector((state: RootState) => state.editToDoReducer)

    const { data: todos, isLoading } = useGetTodosQuery(user.id)
    const [addToDo] = useAddTodoMutation()
    const [editToDo] = useEditToDoMutation()
    const [deleteToDo] = useDeleteToDoMutation()

    return (
        <main className="flex flex-col items-center pt-10">
            <ToDoInputForm
                requestId={user.id}
                addToDo={addToDo}
            />
            {isLoading && <Loading />}
            {todos?.length === 0 && <div className="text-2xl pl-2">No ToDos!</div>}
            {todos && <ul>
                {todos && todos.map(todo => {
                    const listItemClassName = editingId === todo._id
                        ? 'flex p-2 gap-2 m-2 border-customColorBorderOne border-2 rounded-md'
                        : 'flex p-2 gap-2 m-2'

                    return (
                        <li
                            className={listItemClassName}
                            key={todo._id}
                        >
                            {editingId === todo._id ?
                                <ToDoInputEdit
                                    todo={todo}
                                    requestId={user.id}
                                    editToDo={editToDo}
                                    deleteToDo={deleteToDo}
                                />
                                :
                                <ToDoCard
                                    todo={todo}
                                    requestId={user.id}
                                    editToDo={editToDo}
                                    deleteToDo={deleteToDo}
                                />
                            }
                        </li>
                    )
                })}
            </ul>}

        </main>
    );
}

export default PersonalToDo;