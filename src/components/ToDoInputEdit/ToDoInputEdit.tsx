import { useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { useDeleteToDoMutation, useEditToDoMutation } from '../../redux/services/ToDoServices'
import { SubmitHandler, useForm } from "react-hook-form"
import Select from 'react-select'
import correctColorSetting from '../../utils/correctColorSetting'
import { priorityOptions } from '../../models/Priority'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { ToDoDataResponse } from '../../models/ToDoData'
import { setEditingId } from "../../redux/reducers/EditToDoSlice"
import { toast } from 'react-toastify'
import { GroupToDoDataResponse } from '../../models/GroupToDoData'

interface EditToDoRequest {
  requestId: string
  editedTodo: any // Not Good
}

interface DeleteToDoRequest {
  requestId: string
  todoId: string
}

interface ToDoEditProps {
  todo: ToDoDataResponse
  requestId: string 
  editToDo: (request: EditToDoRequest) => Promise<any>
  deleteToDo: (request: DeleteToDoRequest) => Promise<any>
}

const ToDoInputEdit = ({ todo, requestId, editToDo, deleteToDo }: ToDoEditProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ToDoDataResponse>({
        defaultValues: todo
    })

    const dispatch = useAppDispatch()

    const [priority, setPriority] = useState<number>(todo.priority)

    const handleEditSubmit: SubmitHandler<ToDoDataResponse> = async (data) => {
        try {
            const editedToDo = {
                ...data,
                priority,
            }
            if (JSON.stringify(editedToDo) !== JSON.stringify(todo)) {
                await editToDo({ requestId: requestId, editedTodo: editedToDo })
                dispatch(setEditingId(''))
            } else {
                dispatch(setEditingId(''))
            }
        } catch (e) {
            toast.error('Change was not successful')
        }
    }

    return (
        <>
            <form className='flex flex-col p-2 gap-2 w-160'>
                <div className='flex justify-between'>
                    <input
                        id='title'
                        type="text"
                        className='input w-144 text-xl'
                        placeholder="Task title"
                        {...register("title", {
                            required: "Required field"
                        })}
                    />
                    <div className='flex gap-2'>
                        <FontAwesomeIcon
                            icon={faCheck}
                            className='hover:cursor-pointer'
                            onClick={handleSubmit(handleEditSubmit)}
                        />
                        <FontAwesomeIcon
                            icon={faTrashCan}
                            className='hover:cursor-pointer'
                            onClick={() => deleteToDo({ requestId: requestId, todoId: todo._id })}
                        />
                    </div>
                </div>
                <p className='text-red-600'>{errors.title?.message}</p>
                <textarea
                    id='description'
                    className='textarea'
                    placeholder="Describe what needs to be done"
                    {...register("description")}
                />
                <div className='flex gap-3'>
                    <input
                        id='deadline'
                        type='datetime-local'
                        className='input-datetime bg-customColorBgOne'
                        {...register("deadline")}
                    />
                    <Select
                        id="priority"
                        styles={
                            {
                                control: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: correctColorSetting(priority),
                                    border: correctColorSetting(priority),
                                    height: '50px',
                                    minHeight: '50px',
                                    transition: 'background-color .3s ease',
                                }),

                                menu: (provided, state) => ({
                                    ...provided,
                                    color: 'blue',
                                }),
                                option: (provided, state) => ({
                                    ...provided,
                                    fontWeight: 'bold',
                                }),
                                singleValue: (provided, state) => ({
                                    ...provided,
                                    fontWeight: 'bold',
                                }),
                                placeholder: (provided, state) => ({
                                    ...provided,
                                    fontWeight: 'bold',
                                }),
                            }
                        }
                        classNamePrefix="select"
                        value={priorityOptions.find(option => option.value === priority)}
                        options={priorityOptions}
                        onChange={(priorityObj) => {
                            if (priorityObj) {
                                setPriority(priorityObj.value)
                            }
                        }}
                    />
                </div>
            </form>
        </>
    )
}

export default ToDoInputEdit