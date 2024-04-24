import { useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import Select from 'react-select'
import correctColorSetting from '../../utils/correctColorSetting'
import { priorityOptions } from '../../models/Priority'
import { ToDoDataRequest } from '../../models/ToDoData'
import { GroupToDoDataRequest } from "../../models/GroupToDoData"
import { motion, MotionConfig, AnimatePresence } from "framer-motion"
import AnimatedText from '../AnimatedText/AnimatedText'
import { formVariants, initialButtonts, inputVariants, movingVariants } from './ToDoInputForm.animation'
import Button from '../Button/Button'

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
            className='flex flex-col rounded-md p-2 gap-2 mt-28 mb-4 w-[95%] lg:w-160 border-2'
            variants={formVariants}
            initial="hidden"
            animate="visible"
        >
            <legend
                className="bg-customColorBgThree text-customColorBorderOne top-31.2 absolute text-2xl font-bold ml-10"
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
                    className='input text-base md:text-xl w-full'
                    placeholder="Task title"
                    {...register("title", {
                        required: "Required field"
                    })}
                />
            </motion.div>
            <AnimatePresence >
                {errors.title && (
                    <motion.p
                        variants={movingVariants(0)}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                        className='text-red-600 font-semibold pl-2'
                    >
                        {errors.title.message}
                    </motion.p>
                )}
            </AnimatePresence>
            <motion.div
                variants={inputVariants(-250)}
                initial="hidden"
                animate="visible"
            >
                <textarea
                    id='description'
                    className='textarea w-full text-base'
                    placeholder="Describe what needs to be done"
                    {...register("description")}

                />
            </motion.div>
            <div className='flex justify-between gap-0'>
                <motion.div
                    className='flex flex-wrap gap-3'
                    variants={inputVariants(-500)}
                    initial="hidden"
                    animate="visible"
                >
                    <div>
                        <input
                            id='time'
                            type='datetime-local'
                            className='input-datetime text-base w-44 bg-customColorBgOne h-12'
                            {...register("deadline", {
                                required: "Required field"
                            })}
                        />
                        <AnimatePresence >
                            {errors.deadline && (
                                <motion.p
                                    variants={movingVariants(0)}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                                    className='text-red-600 font-semibold pl-2'
                                >
                                    {errors.deadline?.message}
                                </motion.p>
                            )}
                        </AnimatePresence>
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
                <div className='flex flex-wrap w-auto sm:gap-3 sm:w-auto'>
                    <MotionConfig
                        transition={{
                            duration: 0.125,
                            ease: "easeInOut"
                        }}
                    >
                        <Button
                            onClick={handleReset}
                            className="bg-[#F39C12] h-12 hover:bg-[#6b7280]"
                            variants={initialButtonts}
                            type='reset'
                        >
                            Clear
                        </Button>
                        <Button
                            onClick={handleSubmit(handleAddToDo)}// here
                            className="bg-[#f95959] h-12"
                            variants={initialButtonts}
                            type='submit'
                        >
                            Add task
                        </Button>
                    </MotionConfig>
                </div>
            </div>
        </motion.form>
    )
}

export default ToDoInputForm