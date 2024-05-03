import React from 'react'
import { useNavigate } from 'react-router-dom'
import { GroupToDoDataInfo } from '../../models/GroupToDoData'
import { motion } from 'framer-motion'

const groupVariants = (delay: number) => ({
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            delay: 1.2 + (0.1 * delay),
            duration: 0.5,
        }
    },
})

const GroupCard = ({ group, delay }: { group: GroupToDoDataInfo, delay: number }) => {
    const navigate = useNavigate()

    return (
        <motion.div
            className='flex flex-col gap-4 border-2 max-w-[95%] lg:max-w-[40rem] border-customColorBorderOne rounded-lg p-4 shadow-lg hover:cursor-pointer'
            whileHover={{ scale: 1.1 }}
            variants={groupVariants(delay)}
            initial='hidden'
            animate='visible'
            onClick={() => navigate(`/group/${group._id}`)}
        >
            <h1
                className='text-3xl xs:text-4xl font-bold text-customColorBorderOne break-words hyphens-auto'
            >
                {group.title}
            </h1>
            <div className='text-lg font-medium'>
                <p className='text-customColorBgOne'>Participants:</p>
                {group.participants.length === 1 ?
                    <div>Only you</div> :
                    <>
                        <ul className='list-disc list-inside ml-4'>
                            {group.participants.slice(0, 3).map(participant => (
                                <li key={participant._id}>{participant.email}</li>
                            ))}
                        </ul>
                        {
                            group.participants.length > 3 &&
                            <>
                                <p
                                    className='ml-2 text-customColorBgOne'

                                >
                                    More...
                                </p>
                            </>
                        }
                        <div>
                        </div>
                    </>
                }
            </div>
            <div className='text-lg font-medium'>
                <div className='text-customColorBorderOne'>Completed: <span className='font-bold'>{group.completedToDo}</span></div>
                <div className='text-customColorBgOne'>Uncompleted: <span className='font-bold'>{group.uncompletedToDo}</span></div>
            </div>
        </motion.div>
    )
}

export default React.memo(GroupCard)