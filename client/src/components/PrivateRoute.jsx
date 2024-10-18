import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function PrivateRoute({ children }) {
    //console.log("childern is",children);
    
    const currentUser = useSelector((state) => state?.user?.user?.currentUser?.data)
    

  return currentUser? children: <Navigate to={'/login'}/>
}

export default PrivateRoute