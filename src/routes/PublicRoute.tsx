import { Outlet, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../redux/store"
import { useRefreshUserMutation } from "../redux/services/RefreshServices"
import { useEffect } from "react"
import { tokenReceived } from "../redux/reducers/AuthSlice"
import Loading from "../components/Loading/Loading"
import IError from "../models/IError"
import { toast } from "react-toastify"

const PublicRoute = () => {
    const dispatch = useAppDispatch()
    const [refresh, { isLoading: isRefreshLoading }] = useRefreshUserMutation()
    const navigate = useNavigate()

    useEffect(() => {
        const refreshData = async () => {
            try {
                const response = await refresh().unwrap()
                dispatch(tokenReceived(response))
                navigate('/personal-todo')
            } catch (error) {
                const e = error as IError
                toast.error(e?.data?.message || "Login failed")
            }
        }

        if (localStorage.getItem('accessToken')) {
            refreshData()
        }
    }, [])

    if (isRefreshLoading) {
        return (
            <main className="h-screen flex justify-center items-center">
                <Loading />
            </main>
        )
    }

    return (
        <Outlet />
    )
}

export default PublicRoute