import React, { useState } from 'react'
import { GroupToDoCreateRequest, Participant } from '../../models/GroupToDoData'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCreateNewGroupMutation, useGetRequiredUsersQuery } from '../../redux/services/GroupToDoServices'
import { RootState, useAppSelector } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import LoadingForList from '../Loading/LoadingForList'

const NewGroupInput = () => {
    const { user } = useAppSelector((state: RootState) => state.authReducer)

    const [participants, setParticipants] = useState<Participant[]>([])
    const [activeParticipant, setActiveParticipant] = useState<string>('')
    const [newParticipant, setNewParticipant] = useState<Participant>({} as Participant)
    const [participantInput, setParticipantInput] = useState<string>('')

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<GroupToDoCreateRequest>()

    const [createNewGroup] = useCreateNewGroupMutation()
    const { data: possibleParticipantsList, isLoading } = useGetRequiredUsersQuery(participantInput, {
        skip: participantInput.length === 0,
    })

    const navigate = useNavigate()

    const handleCreateNewGroup: SubmitHandler<GroupToDoCreateRequest> = async (data) => {
        try {
            const newGroupData = {
                ...data,
                createdBy: user.id,
                participants: [{ _id: user.id, email: user.email, name: user.name }, ...participants]
            }

            const response = await createNewGroup(newGroupData).unwrap()

            navigate(`/group/${response.groupId}`)
        } catch (e) {
            console.log(e)
        }
    }

    const handleParticipant = async (e: { target: { value: React.SetStateAction<string> } }) => {
        setParticipantInput(e.target.value)
    }

    const handleChooseParticipant = (participant: Participant) => {
        setNewParticipant(participant)
        setActiveParticipant(participant._id)
    }

    const handleAddParticipant = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const exists = participants.some(participant => participant.email === newParticipant.email)

        if (!exists) {
            setParticipants(currentParticipants => [...currentParticipants, newParticipant])
            setParticipantInput('')
        } else {
            console.log('Participant already exists:', newParticipant.email)
        }
    }

    const handleReset = () => {
        reset()
        setParticipants([])
    }

    return (
        <form
            className='flex flex-col border-2 border-customColorBorderOne rounded-md p-2 gap-2 mb-4 w-160 shadow-lg'
            onSubmit={handleSubmit(handleCreateNewGroup)}
        >
            <legend
                className="bg-customColorBgThree text-customColorBorderOne top-31.2 absolute text-2xl font-bold"
                style={{ left: 'calc(50% + 2rem)' }}
            >
                CREATE GROUP TODO
            </legend>
            <input
                id='title'
                type="text"
                className='input text-xl'
                placeholder="Group title"
                {...register("title", {
                    required: "Required field"
                })}
            />
            <p className='text-red-600 font-bold pl-2'>{errors.title?.message}</p>
            <div>
                <input
                    type="text"
                    className='input w-64'
                    value={participantInput}
                    placeholder="Participant email or name"
                    onChange={handleParticipant}
                />
                <button
                    className='btn-clear bg-[#F39C12] h-10 ml-3'
                    onClick={handleAddParticipant}
                >
                    Add Participant
                </button>
                {
                    participantInput.length > 0 && (
                        isLoading ?
                            <div className='flex items-center justify-center absolute w-64 h-24 bg-white mt-2 rounded-md'>
                                <LoadingForList />
                            </div> :
                            (possibleParticipantsList && possibleParticipantsList.length > 0 ?
                                <ul className="w-64 absolute mt-2 max-h-48 overflow-auto bg-white rounded-md">
                                    {possibleParticipantsList && possibleParticipantsList.map(participant => (
                                        participant._id !== user.id &&
                                        <li
                                            key={participant._id}
                                            className="p-2 font-semibold hover:bg-gray-100 cursor-pointer"
                                            style={activeParticipant === participant._id ? { backgroundColor: '#79c2d0' } : {}}
                                            onClick={() => handleChooseParticipant(participant)}
                                        >
                                            <div>{participant.email}</div>
                                            <div>{participant.name}</div>
                                        </li>
                                    ))}
                                </ul>
                                :
                                <div className='flex items-center justify-center absolute w-64 h-20 bg-white mt-2 rounded-md text-xl font-bold'>
                                    Can't find participants
                                </div>
                            )
                    )
                }
            </div>
            {
                participants.length > 0 ?
                    <ul className='flex flex-wrap gap-3 w-160'>
                        {participants.map((participant, index) => (
                            <li
                                className='border-dashed border-2 border-customColorBorderOne p-1 font-semibold'
                                key={participant._id}
                            >
                                {participant.email}
                                <FontAwesomeIcon
                                    className='text-customColorBorderOne ml-2 cursor-pointer'
                                    icon={faXmark}
                                    onClick={() => {
                                        const newParticipants = participants.filter((_, i) => i !== index);
                                        setParticipants(newParticipants);
                                    }}
                                />
                            </li>
                        ))}
                    </ul> :
                    <div className='text-xl font-semibold'>No participants</div>
            }
            <div className='flex justify-between'>
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
                        Create
                    </button>
                </div>
            </div>
        </form>
    )
}

export default NewGroupInput