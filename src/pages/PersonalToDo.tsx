import { RootState, useAppSelector } from "../redux/store"
import { useGetTodosQuery, useAddTodoMutation, useDeleteToDoMutation, useEditToDoMutation } from '../redux/services/ToDoServices'
import ToDoInputForm from "../components/ToDoInputForm/ToDoInputForm"
import ToDoCard from "../components/ToDoCard/ToDoCard"
import ToDoInputEdit from "../components/ToDoInputEdit/ToDoInputEdit"
import Loading from "../components/Loading/Loading"
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
            {todos?.length === 0 &&
                <motion.div
                    className="text-2xl pl-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 1 } }}
                >
                    No ToDos!
                </motion.div>
            }
            {todos &&
                <ul
                    className="w-[95%] lg:w-160"
                >
                    <AnimatePresence>
                        {todos && todos.map((todo, index) => {
                            const listItemClassName = editingId === todo._id
                                ? 'flex p-2 justify-between border-customColorBorderOne border-2 rounded-md'
                                : 'flex p-2 justify-between'

                            return (
                                <motion.li
                                    className={listItemClassName}
                                    key={todo._id}
                                    variants={todoVariants(index)}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
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
                                </motion.li>
                            )
                        })}
                    </AnimatePresence>
                </ul>}

        </main>
    );
}

export default PersonalToDo;