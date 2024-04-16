import React, { useState } from 'react'
import { RootState, useAppSelector } from '../redux/store'
import { useGetAllToDosQuery } from '../redux/services/ToDoServices'
import { AnimatePresence, motion } from 'framer-motion';
import CalendarComponent from '../components/Calendar/CalendarComponent'
import CalendarModul from '../components/Moduls/CalendarModul'
import { ToDoDataResponse } from '../models/ToDoData'
import Loading from '../components/Loading/Loading'
import Modul from '../components/Moduls/Modul'

const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
}

const Calendar = () => {
    const { user } = useAppSelector((state: RootState) => state.authReducer)
    const { data: todos, isLoading: isDataLoading } = useGetAllToDosQuery(user.id)
    const [selectedToDo, setSelectedToDo] = useState<ToDoDataResponse | null>(null)

    if (isDataLoading) {
        return <Loading />
    }

   return (
        <main>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.5 }}
            >
                <CalendarComponent
                    todos={todos || []}
                    handleEventClick={(todo) => setSelectedToDo(todo)}
                />
            </motion.div>
            <AnimatePresence>
                {selectedToDo && (
                    <Modul onClose={() => setSelectedToDo(null)}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5 }}
                        >
                            <CalendarModul todo={selectedToDo} />
                        </motion.div>
                    </Modul>
                )}
            </AnimatePresence>
        </main>
    )
}

export default Calendar