import React from 'react'
import NewGroupInput from '../components/NewGroupInput/NewGroupInput'
import GroupCard from '../components/GroupCard/GroupCard'
import { group } from 'console'

const groups = [
  { id: '12345', title: '1st Group ToDo', completedToDo: '2', uncompletedToDo: '3' },
  { id: '1234sda5', title: '2st Group ToDo', completedToDo: '4', uncompletedToDo: '8' },
  { id: '12345axzc', title: '3st Group ToDo', completedToDo: '3', uncompletedToDo: '1' },
  { id: '12345axzc', title: '3st Group ToDo', completedToDo: '3', uncompletedToDo: '1' },
  { id: '12345axzc', title: '3st Group ToDo', completedToDo: '3', uncompletedToDo: '1' },
]

const Groups = () => {
  return (
    <main className="flex flex-col items-center pt-10">
      <NewGroupInput />
      <section className='flex flex-wrap gap-8 justify-center w-full max-w-6xl p-4'>
        {groups.map(group => <GroupCard key={group.id} group={group} />)}
      </section>
    </main>
  )
}

export default Groups