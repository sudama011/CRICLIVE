import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from '../components/NotFound'
import ScoreBoard from '../components/ScoreBoard'
import StepperContainer from '../components/StepperContainer'

const Main = () => {
  return (
    <Routes>
      <Route exact path='/' element={<StepperContainer />} />
      <Route exact path='/score' element={<ScoreBoard />} />
      <Route path='*' component={NotFound} />
    </Routes>
  )
}

export default Main
