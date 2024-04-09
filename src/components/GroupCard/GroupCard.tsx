import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GroupToDoDataInfo } from '../../models/GroupToDoData'

const GroupCard = ({ group }: { group: GroupToDoDataInfo }) => {
  const navigate = useNavigate()

  return (
    <div
      className='flex flex-col gap-4 border-2 border-customColorBorderOne rounded-lg p-4 shadow-lg hover:cursor-pointer'
      onClick={() => navigate(`/group/${group._id}`)}
    >
      <h1 className='text-4xl font-bold text-customColorBorderOne'>{group.title}</h1>
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
    </div>
  )
}

export default GroupCard