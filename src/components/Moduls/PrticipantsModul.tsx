import LoadingForList from "../Loading/LoadingForList";
import { Participant } from "../../models/GroupToDoData";

const ParticipantsModal = ({ usersList, isLoading }: { usersList: Participant[], isLoading: boolean }) => {
    return (
        <>
            <h1 className='text-2xl font-bold mb-2'>Participants List</h1>
            {isLoading && <LoadingForList />}
            {usersList?.length === 1 && <div>Only you</div>}
            {usersList && usersList.length > 1 &&
                <ul className="w-full max-h-64 overflow-auto">
                    {usersList.map(participant => (
                        <li key={participant._id} className="p-2 font-semibold hover:bg-gray-100">
                            <div>{participant.email}</div>
                            <div>{participant.name}</div>
                        </li>
                    ))}
                </ul>
            }
        </>
    )
}

export default ParticipantsModal