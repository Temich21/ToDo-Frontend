import React, { useState } from 'react'
import { GroupToDoCreateRequest, Participant } from '../../models/GroupToDoData'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useCreateNewGroupMutation, useGetRequiredUsersQuery } from '../../redux/services/GroupToDoServices'
import { RootState, useAppSelector } from '../../redux/store'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import AnimatedText from '../AnimatedText/AnimatedText'
import { motion, AnimatePresence } from 'framer-motion'
import AddNewParticipant from "../AddNewParticipant/AddNewParticipant"
import 'react-toastify/dist/ReactToastify.css'
import { buttonsVariats, formVariants, inputVariants, movingVariants } from './NewGroupInput.animation'
import filterExistingParticipants from '../../utils/filterExistingParticipants'
import Button from '../Button/Button'

const NewGroupInput = () => {
    const { user } = useAppSelector((state: RootState) => state.authReducer)

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<GroupToDoCreateRequest>()

    const handleReset = () => {
        reset()
        setParticipants([])
        setParticipantInput('')
        setNewParticipant({} as Participant)
    }

    // New Participants Adding
    const [participants, setParticipants] = useState<Participant[]>([])
    const [activeParticipant, setActiveParticipant] = useState<string>('')
    const [newParticipant, setNewParticipant] = useState<Participant>({} as Participant)
    const [participantInput, setParticipantInput] = useState<string>('')
    
    const { data: possibleParticipantsList, isLoading } = useGetRequiredUsersQuery(participantInput, {
        skip: participantInput.length === 0,
    })

    const handleChooseParticipant = (participant: Participant) => {
        setNewParticipant(participant)
        setActiveParticipant(participant._id)
    }

    const handleAddParticipant = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (Object.keys(newParticipant).length !== 0) {
            setParticipants(currentParticipants => [...currentParticipants, newParticipant])
            setParticipantInput('')
            setNewParticipant({} as Participant)
        }
    }

    // New Group Creating
    const [createNewGroup] = useCreateNewGroupMutation()

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

    return (
        <motion.form
            className='flex flex-col border-2 rounded-md p-2 gap-2 mt-28 w-[95%] lg:w-160 shadow-lg'
            variants={formVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit(handleCreateNewGroup)}
        >
            <legend
                className="bg-customColorBgThree text-customColorBorderOne top-31.2 absolute text-2xl font-bold ml-10"
            >
                <AnimatedText
                    text={'CREATE GROUP TODO'}
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
                    className='input w-full text-base md:text-xl'
                    placeholder="Group title"
                    {...register("title", {
                        required: "Required field"
                    })}
                />
            </motion.div>
            <AnimatePresence>
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
            <AddNewParticipant
                userId={user.id}
                participantInput={participantInput}
                handleParticipantInput={(e: React.ChangeEvent<HTMLInputElement>) => setParticipantInput(e.target.value)}
                handleAddParticipant={handleAddParticipant}
                possibleParticipantsList={filterExistingParticipants(possibleParticipantsList || [], participants, user.id)}
                activeParticipant={activeParticipant}
                handleChooseParticipant={handleChooseParticipant}
                isLoading={isLoading}
            />
            {
                participants.length > 0 ?

                    <ul
                        className='flex flex-wrap gap-3 w-160'
                    >
                        <AnimatePresence>
                            {participants.map((participant, index) => (
                                <motion.li
                                    key={participant._id}
                                    className='border-dashed border-2 border-customColorBorderOne p-1 font-semibold'
                                    variants={movingVariants(0)}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
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
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                    :
                    <motion.div
                        className='text-xl font-semibold'
                        variants={movingVariants(1.5)}
                        initial="hidden"
                        animate="visible"
                    >
                        No participants
                    </motion.div>
            }
            <div className='flex justify-between'>
                <div className='flex gap-3'>
                    <Button
                        onClick={handleReset}
                        className="bg-[#F39C12] h-12 hover:bg-[#6b7280]"
                        variants={buttonsVariats}
                        type='reset'
                        whileTap={{ y: -5 }}
                    >
                        Clear
                    </Button>
                    <Button
                        onClick={handleSubmit(handleCreateNewGroup)}
                        className="bg-[#f95959] h-12"
                        variants={buttonsVariats}
                        type='submit'
                        whileHover={buttonsVariats.hover}
                        whileTap={buttonsVariats.tap}
                    >
                        Create group
                    </Button>
                </div>
            </div>
        </motion.form>
    )
}

export default React.memo(NewGroupInput)