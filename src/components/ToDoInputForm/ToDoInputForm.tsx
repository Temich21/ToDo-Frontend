import { useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import Select from 'react-select'
import correctColorSetting from '../../utils/correctColorSetting'
import { priorityOptions } from '../../models/Priority'
import { ToDoDataRequest } from '../../models/ToDoData'
import { GroupToDoDataRequest } from "../../models/GroupToDoData"
import { motion, MotionConfig } from "framer-motion"
import AnimatedText from '../AnimatedText/AnimatedText'
import { formVariants, initialButtonts, inputVariants } from './ToDoInputForm.animation'

interface AddToDoRequest {
    requestId: string
    newToDo: any
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
        <motion.form
            className='flex flex-col rounded-md p-2 gap-2 mt-28 mb-4 w-160 border-2'
            variants={formVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit(handleAddToDo)}
        >
            <legend
                className="bg-customColorBgThree text-customColorBorderOne top-31.2 absolute text-2xl font-bold"
                style={{ left: 'calc(50% + 6rem)' }}
            >
                <AnimatedText
                    text={'TODO INPUT'}
                />
            </legend>
            <motion.div
                variants={inputVariants(-100)}
                initial="hidden"
                animate="visible"
            >
                <input
                    id='title'
                    type="text"
                    className='input text-xl w-full'
                    placeholder="Task title"
                    {...register("title", {
                        required: "Required field"
                    })}
                />
            </motion.div>
            <p className='text-red-600 font-bold pl-2'>{errors.title?.message}</p>
            <motion.div
                variants={inputVariants(-250)}
                initial="hidden"
                animate="visible"
            >
                <textarea
                    id='description'
                    className='textarea w-full'
                    placeholder="Describe what needs to be done"
                    {...register("description")}

                />
            </motion.div>
            <div className='flex justify-between'>
                <motion.div
                    className='flex gap-3'
                    variants={inputVariants(-500)}
                    initial="hidden"
                    animate="visible"
                >
                    <div>
                        <input
                            id='time'
                            type='datetime-local'
                            className='input-datetime bg-customColorBgOne h-12'
                            {...register("deadline", {
                                required: "Required field"
                            })}
                        />
                        <p className='text-red-600 font-bold pl-2'>{errors.deadline?.message}</p>
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
                </motion.div>
                <div className='flex gap-3'>
                    <MotionConfig
                        transition={{
                            duration: 0.125,
                            ease: "easeInOut"
                        }}
                    >
                        <motion.button
                            type='reset'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95, rotate: "2.5deg" }}
                            variants={initialButtonts}
                            initial="hidden"
                            animate="visible"
                            className='btn-clear bg-[#F39C12] h-12'
                            onClick={handleReset}
                        >
                            Clear
                        </motion.button>
                        <motion.button
                            type='submit'
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95, rotate: "-2.5deg" }}
                            variants={initialButtonts}
                            initial="hidden"
                            animate="visible"
                            className='btn bg-[#f95959] h-12'
                        >
                            Add task
                        </motion.button>
                    </MotionConfig>
                </div>
            </div>
        </motion.form>
    )
}

export default ToDoInputForm