import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from './NotFound'
import ScoreBoard from './ScoreBoard'
import StepperContainer from './StepperContainer'

export default function Container() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<StepperContainer />} />
        <Route exact path='/score' element={<ScoreBoard />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  )
}
