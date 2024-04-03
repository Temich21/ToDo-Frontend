import React from 'react'
import { GroupToDoCreate } from '../../models/GroupToDoData'
import { useForm } from 'react-hook-form'

const NewGroupInput = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<GroupToDoCreate>()

    return (
        <form
            className='flex flex-col border-2 border-customColorBorderOne rounded-md p-2 gap-2 mb-4 w-160 shadow-lg'
            // onSubmit={handleSubmit(handleAddToDo)}
        >
            <legend className="bg-customColorBgThree text-customColorBorderOne top-31.2 absolute text-2xl font-bold" style={{ left: 'calc(50% + 2rem)' }}>
                CREATE GROUP TODO
            </legend>
            <input
                id='title'
                type="text"
                className='input text-xl'
                placeholder="Task title"
                {...register("title", {
                    required: "Required field"
                })}
            />
            <p className='text-red-600 font-bold pl-2'>{errors.title?.message}</p>
            {/* <textarea
                id='title'
                className='textarea'
                placeholder="Describe what needs to be done"
                {...register("title")}
            /> */}
            <div className='flex justify-between'>
                <div className='flex gap-3'>
                    <button
                        type='reset'
                        className='btn-clear bg-[#F39C12] h-12'
                        // onClick={handleReset}
                    >
                        Clear
                    </button>
                    <button
                        type='submit'
                        className='btn bg-[#f95959] h-12'
                    >
                    Create
                    </button>
                </div>
            </div>
        </form>
    )
}

export default NewGroupInput