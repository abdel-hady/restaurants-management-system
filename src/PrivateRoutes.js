import {Outlet, Navigate} from 'react-router-dom'
import React from 'react'
const PrivateRoutes=()=>{
    let auth = {'access_token': sessionStorage.access_token? true: false}
    return(
        auth.access_token? <Outlet/>: <Navigate to="/"/>
    )
}

export default PrivateRoutes;
