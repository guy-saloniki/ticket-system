import { Navigate, Outlet } from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus"
import Spinner from "./Spinner"

const ProtectedRoute = () => {

    const {loggedIn, checkingStatus} = useAuthStatus()
    if(checkingStatus){
        return <Spinner/>
    }
  return (
    <div>
        {loggedIn ? <Outlet/> : <Navigate to='/login'/>}
    </div>
  )
}

export default ProtectedRoute