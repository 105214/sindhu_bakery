import React, { useState } from 'react'
import { Header } from '../components/user/header.jsx'
import { Footer } from '../components/user/footer.jsx'
import { UserHeader } from '../components/user/userHeader.jsx'
import { Outlet } from 'react-router'



export const RootLayout = () => {
    const [isUserAuth,setIsUserAuth]=useState(false)
  return (
    <>
    {isUserAuth ? <UserHeader/>: <Header/>
}
      <Outlet/>
      <Footer/>
    </>
  )
}


