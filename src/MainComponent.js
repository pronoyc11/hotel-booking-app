import React from 'react'
import Navigation from './components/navigation/Navigation'
import { Route, Routes } from 'react-router'
import Home from './components/body/Home'
import Wellcome from './components/body/Wellcome'

const MainComponent = () => {
  return (
    <div>
        <Navigation />
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Wellcome />} />
        </Routes>
    </div>
  )
}

export default MainComponent