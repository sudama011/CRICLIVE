import React, { useEffect, lazy, Suspense, useContext } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";

import { ThemeProvider } from '@material-ui/core'
import { theme } from './components/ui/Theme'
import Container from './main/Container'
import { UserContext } from './context/userContext';

import Footer from './components/Home/Footer';
import Navbar from './components/Home/Navbar';
import Home from './components/Home/Home';

const Signup = lazy(() => import('./components/Signup'));
const Login = lazy(() => import('./components/Login'));
const Profile = lazy(() => import('./components/Profile'));

const CreateTournament = lazy(() => import('./components/Tournament/CreateTournament'));
const Tournament = lazy(() => import('./components/Tournament/Tournament'));
const AddTeam = lazy(() => import('./components/Tournament/AddTeam'));
const ScheduleMatch = lazy(() => import('./components/Tournament/ScheduleMatch'));

const Team = lazy(() => import('./components/Team/Team'));
const AddPlayer = lazy(() => import('./components/Team/AddPlayer'));


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

          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Suspense><Signup /></Suspense>} />
          <Route path="/login" element={<Suspense><Login /></Suspense>} />
          <Route path="/profile" element={<Suspense><Profile /></Suspense>} />

          <Route path="/createtournament" element={<Suspense><CreateTournament /></Suspense>} />
          <Route path="/tournament/:tournament" element={<Suspense><Tournament /></Suspense>} />
          <Route path="/tournament/:tournament/addteam" element={<Suspense><AddTeam /></Suspense>} />
          <Route path="/tournament/:tournament/scheduleMatch" element={<Suspense><ScheduleMatch /></Suspense>} />

          <Route path="/tournament/:tournament/:team" element={<Suspense><Team /></Suspense>} />
          <Route path="/tournament/:tournament/:team/:addplayer" element={<Suspense><AddPlayer /></Suspense>} />
          <Route path="/match/*" element={<Suspense><ThemeProvider theme={theme}>
            <Container />
          </ThemeProvider></Suspense>} />

        </Routes>

        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;
