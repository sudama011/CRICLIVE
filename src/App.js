import React, { useEffect, lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core';
import { theme } from './components/Match/ui/Theme';
import { auth } from "./firebase";

import { UserContext } from './context/userContext';
import Navbar from './components/Home/Navbar';

const Home = lazy(() => import('./components/Home/Home'));
const Footer = lazy(() => import('./components/Home/Footer'));

const Signup = lazy(() => import('./components/Signup'));
const Login = lazy(() => import('./components/Login'));
const Profile = lazy(() => import('./components/Profile'));

const CreateTournament = lazy(() => import('./components/Tournament/CreateTournament'));
const Tournament = lazy(() => import('./components/Tournament/Tournament'));
const AddTeam = lazy(() => import('./components/Tournament/AddTeam'));
const ScheduleMatch = lazy(() => import('./components/Tournament/ScheduleMatch'));

const Team = lazy(() => import('./components/Team/Team'));
const AddPlayer = lazy(() => import('./components/Team/AddPlayer'));

const Container = lazy(() => import('./components/Match/Container'));

function App() {

  const { updateUser } = useContext(UserContext)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      updateUser(user);
    });
  }, []);

  return (
    <>

      <BrowserRouter>
        <Navbar />

        <Routes>

          <Route exact path="/" element={<Suspense><Home /></Suspense>} />
          <Route exact path="/signup" element={<Suspense><Signup /></Suspense>} />
          <Route exact path="/login" element={<Suspense><Login /></Suspense>} />
          <Route exact path="/profile" element={<Suspense><Profile /></Suspense>} />

          <Route exact path="/createtournament" element={<Suspense><CreateTournament /></Suspense>} />
          <Route exact path="/tournament/:tournament" element={<Suspense><Tournament /></Suspense>} />
          <Route exact path="/tournament/:tournament/addteam" element={<Suspense><AddTeam /></Suspense>} />
          <Route exact path="/tournament/:tournament/scheduleMatch" element={<Suspense><ScheduleMatch /></Suspense>} />

          <Route exact path="/tournament/:tournament/:team" element={<Suspense><Team /></Suspense>} />
          <Route exact path="/tournament/:tournament/:team/addplayer" element={<Suspense><AddPlayer /></Suspense>} />
          <Route exact path="/match/*" element={<ThemeProvider theme={theme}>
            <Suspense><Container /></Suspense>
          </ThemeProvider>} />

        </Routes>

        <Suspense><Footer /></Suspense>
      </BrowserRouter>

    </>
  );
}

export default App;
