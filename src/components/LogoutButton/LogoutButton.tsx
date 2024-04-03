import { useAppDispatch } from "../../redux/store"
import { logout, tokenRemoved } from '../../redux/reducers/AuthSlice'
import { useLogoutUserMutation } from '../../redux/services/AuthServices'
import { FC } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const LogoutButton: FC = () => {
    const dispatch = useAppDispatch()
    const [logoutUser] = useLogoutUserMutation()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logoutUser()
            dispatch(logout())
            dispatch(tokenRemoved())
            toast.success("Logout successful")
            navigate('/auth')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <button
            className="text-3xl font-rakkas underline"
            onClick={handleLogout}
        >
            Logout
        </button>
    )
}

export default LogoutButton