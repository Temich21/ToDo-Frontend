import { Outlet } from "react-router-dom"
import LoadingToRedirect from "../components/Loading/LoadingToRedirect"
import { RootState, useAppDispatch, useAppSelector } from "../redux/store"
import { useRefreshUserMutation } from "../redux/services/RefreshServices"
import { useEffect } from "react"
import { tokenReceived } from "../redux/reducers/AuthSlice"
import Loading from "../components/Loading/Loading"
import Header from "../components/Header/Header"

const PrivateRoute = () => {
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector((state: RootState) => state.authReducer)
  const [refresh, { isLoading: isRefreshLoading, error }] = useRefreshUserMutation()
  useEffect(() => {
    const refreshData = async () => {
      try {
        const response = await refresh().unwrap()
        dispatch(tokenReceived(response))
      } catch (e) {
        console.log(e)
      }
    }

    if (localStorage.getItem('accessToken') && !isAuth) {
      refreshData()
    }
  }, [])

  if (isRefreshLoading) {
    return <Loading />
  }

  return (
    isAuth ?
      <>
        <Header />
        <Outlet />
      </> :
      <LoadingToRedirect
        navigation={'/auth'}
        message={'You are not Authorized'} // add here error?.data.message || 
      />
  )
}

export default PrivateRoute