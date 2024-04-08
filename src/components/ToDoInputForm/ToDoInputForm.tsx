import { useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import Select from 'react-select'
import correctColorSetting from '../../utils/correctColorSetting'
import { priorityOptions } from '../../models/Priority'
import { ToDoDataRequest } from '../../models/ToDoData'
import { GroupToDoDataRequest } from "../../models/GroupToDoData"

interface AddToDoRequest {
    requestId: string
    newToDo: any // Not Good
}

interface ToDoInputProps {
    requestId: string
    author?: {
        _id: string
        email: string
        name: string
    }
    addToDo: (request: AddToDoRequest) => Promise<any>
}

const ToDoInputForm = ({ requestId, author, addToDo }: ToDoInputProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ToDoDataRequest>()

    const [priority, setPriority] = useState<number>(priorityOptions[3].value)

    const handleAddToDo: SubmitHandler<ToDoDataRequest> = async (data) => {
        try {
           let newToDo: ToDoDataRequest | GroupToDoDataRequest = { ...data, priority, completed: false };

            if (author) {
                newToDo = { ...newToDo, author } as GroupToDoDataRequest;
            }
            console.log(newToDo);
            await addToDo({ requestId: requestId, newToDo: newToDo })
            reset()
            setPriority(priorityOptions[3].value)
        } catch (e) {
            console.log(e)
        }
    }

    const handleReset = () => {
        reset()
        setPriority(priorityOptions[3].value)
    }

    return (
        <form
            className='flex flex-col border-2 border-customColorBorderOne rounded-md p-2 gap-2 mb-4 w-160 shadow-lg'
            onSubmit={handleSubmit(handleAddToDo)}
        >
            <legend className="bg-customColorBgThree text-customColorBorderOne top-31.2 absolute text-2xl font-bold" style={{ left: 'calc(50% + 6rem)' }}>TODO INPUT</legend>
            <input
                id='title'
                type="text"
                className='input text-xl'
                placeholder="Task title"
                {...register("title", {
                    required: "Required field"
                })}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        handleSubmit(handleAddToDo)()
                    }
                }}
            />
            <p className='text-red-600 font-bold pl-2'>{errors.title?.message}</p>
            <textarea
                id='description'
                className='textarea'
                placeholder="Describe what needs to be done"
                {...register("description")}
            />
            <div className='flex justify-between'>
                <div className='flex gap-3'>
                    <div>
                        <input
                            id='time'
                            type='datetime-local'
                            className='input-datetime bg-customColorBgOne h-12'
                            {...register("deadline", {
                                required: "Required field"
                            })}
                        />
                        <p className='text-red-600 font-bold pl-2'>{errors.title?.message}</p>
                    </div>
                    <Select
                        id="priority"
                        styles={
                            {
                                control: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: correctColorSetting(priority),
                                    border: correctColorSetting(priority),
                                    height: '3rem',
                                    minHeight: '3rem',
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
                <div className='flex gap-3'>
                    <button
                        type='reset'
                        className='btn-clear bg-[#F39C12] h-12'
                        onClick={handleReset}
                    >
                        Clear
                    </button>
                    <button
                        type='submit'
                        className='btn bg-[#f95959] h-12'
                    >
                        Add task
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ToDoInputForm