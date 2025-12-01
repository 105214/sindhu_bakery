import { useState } from 'react'
import './index.css'
import Card from './components/user/Card'
import { RouterProvider } from 'react-router'
import { router } from './routes/router.jsx'

function App() {


  return (
    <>
     
     <RouterProvider router={router}/>
    </>
  )
}

export default App
