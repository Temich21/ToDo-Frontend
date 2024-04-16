import { useNavigate, useParams } from "react-router-dom";
import { RootState, useAppSelector } from "../redux/store";
import { useGetGroupTodosQuery, useAddGroupTodoMutation, useEditToDoMutation, useDeleteToDoMutation, useLeaveGroupMutation, useGetUsersListQuery } from '../redux/services/GroupToDoServices';
import ToDoInputForm from "../components/ToDoInputForm/ToDoInputForm";
import ToDoCard from "../components/ToDoCard/ToDoCard";
import ToDoCardWithoutEdit from "../components/ToDoCard/ToDoCardWithoutEdit";
import Loading from "../components/Loading/Loading";
import ToDoInputEdit from "../components/ToDoInputEdit/ToDoInputEdit";
import { useState } from "react";
import ParticipantsModul from "../components/Moduls/PrticipantsModul";
import LoadingToRedirect from "../components/Loading/LoadingToRedirect";
import Modul from "../components/Moduls/Modul";
import { motion } from "framer-motion";


const GroupToDo = () => {
    const { id } = useParams<{ id: string }>()
    const { user } = useAppSelector((state: RootState) => state.authReducer)
    const { editingId } = useAppSelector((state: RootState) => state.editToDoReducer)

    const { data: todos, isLoading: isGroupToDoLoading, error } = useGetGroupTodosQuery(`${id}/${user.id}`)
    const [shownAuthor, setShownAuthor] = useState<string>('')
    const [addToDo] = useAddGroupTodoMutation()
    const [editToDo] = useEditToDoMutation()
    const [deleteToDo] = useDeleteToDoMutation()

    const [leaveGroup] = useLeaveGroupMutation()
    const navigate = useNavigate()

    const handleLeaveGroup = () => {
        leaveGroup({ groupId: id || '', userId: user.id })
        navigate('/groups', { replace: true })
    }

    // Move logic to another component
    const [shownPopUpParticipants, setShownPopUpParticipants] = useState<boolean>(false)
    const { data: usersList, isLoading: isUserListsLoading } = useGetUsersListQuery(id || '', {
        skip: !shownPopUpParticipants
    })

    if (isGroupToDoLoading) {
        return <Loading />
    }

    // if (error) {
    //     return (
    //         <LoadingToRedirect
    //             navigation={'/groups'}
    //             message={error?.data.message || ''}
    //         />
    //     )
    // }

    return (
        <main className="flex flex-col items-center pt-10">
            <ToDoInputForm
                requestId={id || ''}
                addToDo={addToDo}
                author={{
                    _id: user.id,
                    email: user.email,
                    name: user.name
                }}
            />
            {/* Move logic to another component, start here */}
            <div className="flex w-160 justify-around">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    className='btn bg-[#ffc93c] h-12'
                    onClick={() => setShownPopUpParticipants(true)}
                >
                    View All Participants
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    className='btn bg-[#f76b8a] h-12'
                    onClick={handleLeaveGroup}
                >
                    Leave group
                </motion.button>
            </div>
            {
                shownPopUpParticipants &&
                <Modul onClose={() => setShownPopUpParticipants(false)}>
                    <ParticipantsModul
                        usersList={usersList || []}
                        isLoading={isUserListsLoading}
                    />
                </Modul>
            }
            {/* end */}

            {todos?.length === 0 && <div className="text-2xl pl-2">No ToDos!</div>}
            {todos &&
                <ul>
                    {todos.map((todo) => (
                        todo.author._id === user.id ?
                            <li key={todo._id} className='flex items-center pr-10'>
                                <div
                                    className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white text-xl font-medium ring-2 ring-white"
                                >
                                    {todo.author.name[0]}
                                </div>
                                <section className={editingId === todo._id
                                    ? 'flex p-2 gap-2 m-2 border-customColorBorderOne border-2 rounded-md'
                                    : 'flex p-2 gap-2 m-2'}>
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
                                <div
                                    className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white text-xl font-medium ring-2 ring-white hover: cursor-default"
                                    onMouseEnter={() => setShownAuthor(todo._id)}
                                    onMouseLeave={() => setShownAuthor('')}
                                >
                                    {todo.author.name[0]}
                                </div>
                                <div className="relative">
                                    {shownAuthor === todo._id && (
                                        <div className='absolute left-full top-0 ml-2 bg-white border border-gray-200 shadow-lg p-3 transition ease-in-out delay-150'>
                                            <div className="font-semibold">{todo.author.email}</div>
                                            <div className="font-semibold">{todo.author.name}</div>
                                        </div>
                                    )}
                                </div>
                            </li>
                    ))}
                </ul>
            }
        </main>
    );
}

export default GroupToDo;