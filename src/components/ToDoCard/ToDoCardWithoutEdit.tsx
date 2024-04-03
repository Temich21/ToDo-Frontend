import { GroupToDoDataResponse } from '../../models/GroupToDoData'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faFlag } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import correctColorSetting from '../../utils/correctColorSetting'

const ToDoCardWithoutEdit = ({ todo }: { todo: GroupToDoDataResponse }) => {
    return (
        <>
            <div style={{ color: correctColorSetting(todo.priority) }}>
                {
                    todo.completed ?
                        <FontAwesomeIcon
                            icon={faCircleCheck}
                        />
                        :
                        <FontAwesomeIcon
                            icon={faCircle}
                        />
                }
            </div>
            <div
                style={
                    todo.completed ? { textDecoration: 'line-through', textDecorationThickness: '2px' } : {}
                }
            >
                <div className='flex justify-between'>
                    <h3 className='w-144 font-bold text-xl'>
                        {todo.title}
                    </h3>
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

export default ToDoCardWithoutEdit