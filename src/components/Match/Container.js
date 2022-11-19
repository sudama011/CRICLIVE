import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import NotFound from './NotFound'
import StepperContainer from './StepperContainer'
const ScoreBoard = lazy(() => import('./ScoreBoard'));
const ScoreBoard2 = lazy(() => import('./ScoreBoard2'));

export default function Container() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<StepperContainer />} />
        <Route exact path='/score' element={<Suspense><ScoreBoard /></Suspense>} />
        <Route exact path='/live-score' element={<Suspense><ScoreBoard2 /></Suspense>} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  )
}