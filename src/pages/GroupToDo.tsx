import { useNavigate, useParams } from "react-router-dom";
import { RootState, useAppSelector } from "../redux/store";
import { useGetGroupTodosQuery, useAddGroupTodoMutation, useEditToDoMutation, useDeleteToDoMutation, useLeaveGroupMutation, useGetUsersListQuery } from '../redux/services/GroupToDoServices';
import ToDoInputForm from "../components/ToDoInputForm/ToDoInputForm";
import ToDoCard from "../components/ToDoCard/ToDoCard";
import ToDoCardWithoutEdit from "../components/ToDoCard/ToDoCardWithoutEdit";
import Loading from "../components/Loading/Loading";
import ToDoInputEdit from "../components/ToDoInputEdit/ToDoInputEdit";
import { useState } from "react";
import LoadingForList from "../components/Loading/LoadingForList";

const GroupToDo = () => {
    const { id } = useParams<{ id: string }>()
    const { user } = useAppSelector((state: RootState) => state.authReducer)
    const { editingId } = useAppSelector((state: RootState) => state.editToDoReducer)

    const { data: todos, isLoading } = useGetGroupTodosQuery(`${id}/${user.id}`)
    const [addToDo] = useAddGroupTodoMutation()
    const [editToDo] = useEditToDoMutation()
    const [deleteToDo] = useDeleteToDoMutation()

    const [leaveGroup] = useLeaveGroupMutation()
    const navigate = useNavigate()

    const handleLeaveGroup = () => {
        leaveGroup({ groupId: id || '', userId: user.id })
        navigate('/groups', { replace: true })
    }

    const [isUserList, setIsUserList] = useState<boolean>(false)
    const { data: userList, isLoading: userListLoading } = useGetUsersListQuery(id || '', {
        skip: !isUserList
    })

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
            <div className="flex gap-3">
                <button
                    className='btn bg-[#f95959] h-12'
                    onClick={() => setIsUserList(true)}
                >
                    View All Participants
                </button>
                <button
                    className='btn bg-[#f95959] h-12'
                    onClick={handleLeaveGroup}
                >
                    Leave group
                </button>
            </div>
            {isUserList &&
                <div className="">
                    {userListLoading && <LoadingForList />}
                    {userList?.length === 1 && <div>Only you</div>}
                    {userList && userList?.length > 1 &&
                        <ul>
                            {userList && userList.map(participant => (
                                <li
                                    key={participant._id}
                                    className="p-2 font-semibold hover:bg-gray-100 cursor-pointer"
                                >
                                    <div>{participant.email}</div>
                                    <div>{participant.name}</div>
                                </li>
                            ))}
                        </ul>
                    }
                </div>
            }
            {isLoading && <Loading />}
            {todos?.length === 0 && <div className="text-2xl pl-2">No ToDos!</div>}
            {todos &&
                <ul>
                    {todos.map((todo) => (
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
            }
        </main>
    );
}

export default GroupToDo;