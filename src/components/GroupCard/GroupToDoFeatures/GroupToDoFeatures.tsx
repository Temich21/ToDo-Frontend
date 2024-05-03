import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useLeaveGroupMutation, useGetUsersListQuery, useGetRequiredUsersQuery, useAddNewParticipantMutation } from '../../../redux/services/GroupToDoServices';
import AddNewParticipant from "../../AddNewParticipant/AddNewParticipant"
import Modul from '../../Moduls/Modul'
import ParticipantsModul from '../../Moduls/ParticipantsModul'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from "framer-motion";
import { Participant } from '../../../models/GroupToDoData'
import filterExistingParticipants from '../../../utils/filterExistingParticipants';
import IError from '../../../models/IError';
import Button from '../../Button/Button';

const buttonsVariats = {
    hidden: {
        opacity: 0
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 1.2,
            duration: 0.5,
        }
    }
}

const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
}

const GroupToDoFeatures = ({ userId, groupId }: { userId: string, groupId: string }) => {
    // Participants PopUp
    const [shownPopUpParticipants, setShownPopUpParticipants] = useState<boolean>(false)
    const { data: usersList, isLoading: isUserListsLoading } = useGetUsersListQuery(groupId || '')

    // New Participant Adding
    const [addNewParticipant] = useAddNewParticipantMutation()
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

    const handleAddParticipant = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        try {
            await addNewParticipant({ groupId, newParticipant }).unwrap()
            toast.success("User was added successful")
        } catch (error) {
            const e = error as IError
            toast.error(e.data.message)
        }
    }

    // Leaving from Group Logic
    const [leaveGroup] = useLeaveGroupMutation()
    const navigate = useNavigate()

    const handleLeaveGroup = async () => {
        try {
            await leaveGroup({ groupId: groupId, userId: userId })
            navigate('/groups', { replace: true })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <section className='w-[95%] lg:w-160'>
            <div className="flex justify-around">
                <Button
                    onClick={() => setShownPopUpParticipants(true)}
                    className="bg-[#ffc93c] h-12"
                    variants={buttonsVariats}
                    type='submit'
                >
                    Participants List
                </Button>
                <Button
                    onClick={handleLeaveGroup}
                    className="bg-[#f76b8a] h-12"
                    variants={buttonsVariats}
                    type='submit'
                >
                    Leave group
                </Button>
            </div>
            {
                shownPopUpParticipants &&
                <Modul onClose={() => setShownPopUpParticipants(false)}>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5 }}
                    >
                        <ParticipantsModul
                            usersList={usersList || []}
                            isLoading={isUserListsLoading}
                        />
                    </motion.div>
                    <AddNewParticipant
                        userId={userId}
                        participantInput={participantInput}
                        handleParticipantInput={(e: React.ChangeEvent<HTMLInputElement>) => setParticipantInput(e.target.value)}
                        handleAddParticipant={handleAddParticipant}
                        possibleParticipantsList={filterExistingParticipants(possibleParticipantsList || [], usersList || [], userId)}
                        activeParticipant={activeParticipant}
                        handleChooseParticipant={handleChooseParticipant}
                        isLoading={isLoading}
                    />
                </Modul>
            }
        </section>
    )
}

export default React.memo(GroupToDoFeatures)