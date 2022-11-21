import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from './NotFound'
import StepperContainer from './StepperContainer'
import ScoreBoard from './ScoreBoard';
import ScoreBoard2 from './ScoreBoard2';

export default function Container() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<StepperContainer />} />
        <Route exact path='/score' element={<ScoreBoard />} />
        <Route exact path='/live-score' element={<ScoreBoard2 />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  )
}