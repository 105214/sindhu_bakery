import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'

export const ProtectRoutes = () => {

    const [isUserAuth,setIsUserAuth]=useState(false)
    const navigate = useNavigate()

    useEffect(()=>{

            if(!isUserAuth){
               navigate('/login')
            }
    },[])
    
  return <Outlet/>
}
