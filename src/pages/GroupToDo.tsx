import React from 'react'
import { useParams } from "react-router-dom";
import { RootState, useAppSelector } from "../redux/store";
import { useGetGroupTodosQuery, useAddGroupTodoMutation, useEditToDoMutation, useDeleteToDoMutation } from '../redux/services/GroupToDoServices';
import ToDoInputForm from "../components/ToDoInputForm/ToDoInputForm";
import ToDoCard from "../components/ToDoCard/ToDoCard";
import ToDoCardWithoutEdit from "../components/ToDoCard/ToDoCardWithoutEdit";
import Loading from "../components/Loading/Loading";
import GroupToDoFeatures from '../components/GroupCard/GroupToDoFeatures/GroupToDoFeatures';
import ToDoInputEdit from "../components/ToDoInputEdit/ToDoInputEdit";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"

const todoVariants = (delay: number) => ({
    hidden: {
        x: -100,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            delay: 0.2 + (0.1 * delay),
            duration: 0.5,
        }
    },
})

const GroupToDo = () => {
    const { id } = useParams<{ id: string }>()
    const { user } = useAppSelector((state: RootState) => state.authReducer)
    const { editingId } = useAppSelector((state: RootState) => state.editToDoReducer)

    const { data: todos, isLoading: isGroupToDoLoading, error } = useGetGroupTodosQuery(`${id}/${user.id}`)
    const [shownAuthor, setShownAuthor] = useState<string>('')
    const [addToDo] = useAddGroupTodoMutation()
    const [editToDo] = useEditToDoMutation()
    const [deleteToDo] = useDeleteToDoMutation()

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

            <GroupToDoFeatures userId={user.id} groupId={id || ''} />

            {todos?.length === 0 &&
                <motion.div
                    className="text-2xl pl-2 pt-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 1 } }}
                >
                    No ToDos!
                </motion.div>
            }

            {todos &&
                <ul>
                    <AnimatePresence>
                        {todos.map((todo, index) => (
                            todo.author._id === user.id ?
                                <motion.li
                                    key={todo._id}
                                    className='flex items-center pr-10'
                                    variants={todoVariants(index)}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                                >
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
                                </motion.li>
                                :
                                <motion.li
                                    key={todo._id}
                                    className='flex items-center pl-10'
                                    variants={todoVariants(index)}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                                >
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
                                    <AnimatePresence>
                                        <motion.div
                                            className="relative"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, transition: { duration: 0.2 } }}
                                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                                        >
                                            {shownAuthor === todo._id && (
                                                <div className='absolute left-full top-0 ml-2 bg-white border border-gray-200 shadow-lg p-3 transition ease-in-out delay-150'>
                                                    <div className="font-semibold">{todo.author.email}</div>
                                                    <div className="font-semibold">{todo.author.name}</div>
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>
                                </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
            }
        </main>
    );
}

export default GroupToDo;