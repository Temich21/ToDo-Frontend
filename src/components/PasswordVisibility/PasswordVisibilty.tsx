import { FC } from "react"
import { setEye } from "../../redux/reducers/EyeSlice"
import { useAppDispatch, useAppSelector } from "../../redux/store"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'

const PasswordVisiblity: FC = () => {
    const dispatch = useAppDispatch()
    const { eye } = useAppSelector(state => state.eyeReducer)

    return (
        <button
            onClick={(e) => {
                e.preventDefault()
                dispatch(setEye(!eye))
            }}
            className="w-7"
        >
            {
                eye ?
                    <FontAwesomeIcon className="h-6" icon={faEye} /> :
                    <FontAwesomeIcon className="h-6" icon={faEyeSlash} />
            }
        </button>
    )
}

export default PasswordVisiblity