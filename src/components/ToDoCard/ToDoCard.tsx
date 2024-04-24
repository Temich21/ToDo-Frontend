import { useAppDispatch } from "../../redux/store"
import { setEditingId } from "../../redux/reducers/EditToDoSlice"
import { ToDoDataResponse } from '../../models/ToDoData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faPencil, faFlag } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import correctColorSetting from '../../utils/correctColorSetting'
import { toast } from "react-toastify"

interface EditToDoRequest {
  requestId: string
  editedTodo: any
}

interface DeleteToDoRequest {
  requestId: string
  todoId: string
}

interface ToDoCardProps {
  todo: ToDoDataResponse
  requestId: string
  editToDo: (request: EditToDoRequest) => Promise<any>
  deleteToDo: (request: DeleteToDoRequest) => Promise<any>
}

const ToDoCard = ({ todo, requestId, editToDo, deleteToDo }: ToDoCardProps) => {
  const dispatch = useAppDispatch()

  const handleComplete = async () => {
    try {
      const editedToDo = {
        ...todo,
        completed: !todo.completed
      }
      await editToDo({ requestId: requestId, editedTodo: editedToDo })
    } catch (e) {
      toast.error('Error')
    }
  }

  return (
    <>
      <div
        className='hover:cursor-pointer'
        style={{ color: correctColorSetting(todo.priority) }}
      >
        {
          todo.completed ?
            <FontAwesomeIcon
              icon={faCircleCheck}
              onClick={handleComplete}
            />
            :
            <FontAwesomeIcon
              icon={faCircle}
              onClick={handleComplete}
            />
        }
      </div>
      <div
        className="w-full lg:w-148"
        style={
          todo.completed ? { textDecoration: 'line-through', textDecorationThickness: '2px' } : {}
        }
      >
        <div className='flex justify-between'>
          <h3 className='font-bold text-xl'>
            {todo.title}
          </h3>
          <div className='flex gap-4'>
            <FontAwesomeIcon
              icon={faPencil}
              className='w-6 h-6 hover:cursor-pointer'
              onClick={() => dispatch(setEditingId(todo._id))}
            />
            <FontAwesomeIcon icon={faTrashCan}
              className='w-6 h-6 hover:cursor-pointer'
              onClick={() => deleteToDo({ requestId: requestId, todoId: todo._id })}
            />
          </div>
        </div>
        <p className="font-medium">{todo.description}</p>
        <div className='flex gap-6'>
          <div className="font-medium">{moment(todo.deadline).format('DD-MM-YYYY HH:mm')}</div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faFlag}
              style={{ color: correctColorSetting(todo.priority) }}
            />
            <p className="font-medium">Priority {todo.priority}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ToDoCard