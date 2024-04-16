import React from 'react'
import NewGroupInput from '../components/NewGroupInput/NewGroupInput'
import { useGetGroupsQuery } from '../redux/services/GroupToDoServices';
import GroupCard from '../components/GroupCard/GroupCard'
import { RootState, useAppSelector } from '../redux/store';
import Loading from '../components/Loading/Loading';

const Groups = () => {
  const { user } = useAppSelector((state: RootState) => state.authReducer)
  const { data: groups, isLoading } = useGetGroupsQuery(user.id)

  return (
    <main className="flex flex-col items-center pt-10">
      <NewGroupInput />
      <section className='flex flex-wrap gap-8 justify-center w-full max-w-6xl p-4'>
        {isLoading && <Loading />}
        {groups?.length === 0 && <div className="text-2xl pl-2">No Groups!</div>}
        {groups && groups.map(group => <GroupCard key={group._id} group={group} />)}
      </section>
    </main>
  )
}

export default Groups