import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import AppRoutes from './app/routes/AppRoutes'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"


function App() {

  return (
    <>
      <AppRoutes/>
      <ToastContainer/>
    </>
  )
}

export default App
