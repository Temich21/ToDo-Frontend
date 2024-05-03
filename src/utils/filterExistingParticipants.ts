import { Participant } from '../models/GroupToDoData'

const filterExistingParticipants = (possibleParticipants: Participant[], existingParticipants: Participant[], authUserId: string) => {
    return possibleParticipants.filter(possibleParticipant => {
        if (possibleParticipant._id === authUserId) return false

        return !existingParticipants.some(existingParticipant => existingParticipant._id === possibleParticipant._id)
    })
}

export default filterExistingParticipants