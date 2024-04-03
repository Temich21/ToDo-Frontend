import { useParams } from "react-router-dom";
import { RootState, useAppSelector } from "../redux/store";
import { useGetGroupTodosQuery, useAddGroupTodoMutation, useEditToDoMutation, useDeleteToDoMutation } from '../redux/services/GroupToDoServices';
import ToDoInputForm from "../components/ToDoInputForm/ToDoInputForm";
import ToDoCard from "../components/ToDoCard/ToDoCard";
import ToDoCardWithoutEdit from "../components/ToDoCard/ToDoCardWithoutEdit";
import Loading from "../components/Loading/Loading";
import ToDoInputEdit from "../components/ToDoInputEdit/ToDoInputEdit";

const GroupToDo = () => {
    const { id } = useParams<{ id: string }>()
    const { user } = useAppSelector((state: RootState) => state.authReducer)
    const { editingId } = useAppSelector((state: RootState) => state.editToDoReducer)

    const { data: todos, isLoading } = useGetGroupTodosQuery(id || '')
    const [addToDo] = useAddGroupTodoMutation()
    const [editToDo] = useEditToDoMutation()
    const [deleteToDo] = useDeleteToDoMutation()

    return (
        <main className="flex flex-col items-center pt-10">
            <ToDoInputForm
                requestId={id || ''}
                addToDo={addToDo}
                author={{
                    _id: user.id,
                    email: user.email,
                    name: 'Artem Rakhmatullin'
                }}
            />
            {isLoading && <Loading />}
            {todos?.length === 0 && <div className="text-2xl pl-2">No ToDos!</div>}
            <ul>
                {todos && todos.map((todo) => (
                    todo.author._id === user.id ?
                        <li key={todo._id} className='flex items-center pr-10'>
                            <img
                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                            <section className='flex p-2 gap-2 m-2'>
                                {editingId === todo._id ?
                                    <ToDoInputEdit
                                        todo={todo}
                                        requestId={id || ''}
                                        editToDo={editToDo}
                                        deleteToDo={deleteToDo}
                                    />
                                    :
                                    <ToDoCard
                                        todo={todo}
                                        requestId={id || ''}
                                        editToDo={editToDo}
                                        deleteToDo={deleteToDo}
                                    />
                                }
                            </section>
                        </li>
                        :
                        <li key={todo._id} className='flex items-center pl-10'>
                            <section className='flex p-2 gap-2 m-2'>
                                <ToDoCardWithoutEdit todo={todo} />
                            </section>
                            <img
                                className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                alt=""
                            />
                        </li>
                ))}
            </ul>
        </main>
    );
}

export default GroupToDo;