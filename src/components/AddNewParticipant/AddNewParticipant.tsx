import React, { useState, useRef, useEffect } from 'react'
import LoadingForList from '../Loading/LoadingForList'
import { Participant } from '../../models/GroupToDoData'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../Button/Button'

interface IAddNewParticipant {
    userId: string,
    participantInput: string,
    handleParticipantInput: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleAddParticipant: (e: React.MouseEvent<HTMLButtonElement>) => void,
    possibleParticipantsList: Participant[],
    activeParticipant: string,
    handleChooseParticipant: (participant: Participant) => void,
    isLoading: boolean
}

export const inputVariants = {
    hidden: {
        x: -100,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            delay: 1,
            duration: 0.5,
        }
    },
}

export const buttonVariants = {
    hidden: {
        x: 100,
        opacity: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            delay: 1.5,
            duration: 0.5,
        }
    },
}

const AddNewParticipant = ({
    userId,
    participantInput,
    handleParticipantInput,
    handleAddParticipant,
    possibleParticipantsList,
    activeParticipant,
    handleChooseParticipant,
    isLoading
}: IAddNewParticipant) => {
    const [isListVisible, setIsListVisible] = useState<boolean>(false)
    const listRef = useRef<any>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (listRef.current && !listRef.current.contains(event.target as Node)) {
                setIsListVisible(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div>
            <div className='flex flex-wrap gap-3'>
                <motion.div
                    variants={inputVariants}
                    initial='hidden'
                    animate='visible'
                >
                    <input
                        type="text"
                        className='input w-full md:w-72'
                        value={participantInput}
                        placeholder="Participant email or name"
                        onChange={handleParticipantInput}
                        onFocus={() => setIsListVisible(true)}
                    />
                </motion.div>
                <Button
                    onClick={handleAddParticipant}
                    className="bg-[#F39C12] h-10 hover:bg-[#6b7280] py-0"
                    variants={buttonVariants}
                    type='submit'
                >
                    Add Participant
                </Button>
            </div>
            <AnimatePresence>
                {participantInput.length > 0 && isListVisible && (
                    isLoading ?
                        <motion.div
                            className='flex items-center justify-center absolute w-64 h-24 bg-white mt-2 rounded-md'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { duration: 0.2 } }}
                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        >
                            <LoadingForList />
                        </motion.div> :
                        (possibleParticipantsList.length > 0 ?
                            <motion.ul
                                ref={listRef}
                                className="w-64 absolute mt-2 max-h-48 overflow-auto bg-white rounded-md"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 0.2 } }}
                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                            >
                                {possibleParticipantsList.map(participant => (
                                    participant._id !== userId &&
                                    <li
                                        key={participant._id}
                                        className="p-2 font-semibold hover:bg-gray-100 cursor-pointer"
                                        style={activeParticipant === participant._id ? { backgroundColor: '#79c2d0' } : {}}
                                        onClick={() => handleChooseParticipant(participant)}
                                    >
                                        {participant.email} - {participant.name}
                                    </li>
                                ))}
                            </motion.ul>
                            :
                            <motion.div
                                ref={listRef}
                                className='flex items-center justify-center absolute w-64 h-20 bg-white mt-2 rounded-md text-xl font-bold'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 0.2 } }}
                                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                            >
                                Can't find participant
                            </motion.div>

                        )
                )}
            </AnimatePresence>
        </div>
    )
}

export default AddNewParticipant