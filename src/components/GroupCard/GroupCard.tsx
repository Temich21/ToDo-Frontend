import React from 'react'

const GroupCard = ({group}: any) => {
  return (
    <div className='flex flex-col gap-4 border-2 border-customColorBorderOne rounded-lg p-4 shadow-lg'>
      <h1 className='text-4xl font-bold text-customColorBorderOne'>{group.title}</h1>
      <div className='text-lg font-medium'>
        <p className='text-customColorBgOne'>Participants:</p>
        <ul className='list-disc list-inside ml-4'>
          <li>v1@mail.ru</li>
          <li>v2@mail.ru</li>
          <li>v3@mail.ru</li>
        </ul>
        <p className='ml-2 text-customColorBgTwo cursor-pointer hover:text-customColorBgOne'>More..</p>
      </div>
      <div className='flex justify-between text-lg font-medium'>
        <div className='text-customColorBorderOne'>Completed: <span className='font-bold'>{group.completedToDo}</span></div>
        <div className='text-customColorBgOne'>Uncompleted: <span className='font-bold'>{group.uncompletedToDo}</span></div>
      </div>
    </div>
  )
}

export default GroupCard