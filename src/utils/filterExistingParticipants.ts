import { Participant } from '../models/GroupToDoData'

const filterExistingParticipants = (possibleParticipants: Participant[], existingParticipants: Participant[]) => {
    return possibleParticipants.filter(possible => {
        return !existingParticipants.some(existing => existing._id === possible._id)
    })
}

export default filterExistingParticipants