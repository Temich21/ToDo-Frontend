import moment from 'moment'
import { ToDoDataResponse } from '../../models/ToDoData'

const CalendarModul = ({ todo }: { todo: ToDoDataResponse }) => {
    return (
        <>
            <h1 className='text-2xl font-bold mb-3 break-words hyphens-auto lg:max-w-[39rem]'>{todo.title}</h1>
            <p className='font-semibold'>Description:</p>
            <p className='mb-3 break-words hyphens-auto lg:max-w-[39rem]'>{todo.description}</p>
            {todo.groupTitle && <>
                <p className='font-semibold'>From Group:</p>
                <p className='mb-3'>{todo.groupTitle}</p>
            </>}
            <p className='font-semibold mb-3'>Deadline: {moment(todo.deadline).format('DD-MM-YYYY HH:mm')}</p>
            <p className='mb-3 font-semibold'>Priority: {todo.priority}</p>
            <p className='font-semibold'>Completed: {todo.completed ? 'Yes' : 'No'}</p>
        </>
    )
}

export default CalendarModul