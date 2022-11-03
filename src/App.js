import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";

import { ThemeProvider } from '@material-ui/core'
import { theme } from './components/ui/Theme'
import Container from './main/Container'

import Footer from './components/Home/Footer';
import Navbar from './components/Home/Navbar';
import Home from './components/Home/Home';

const Signup = lazy(() => import('./components/Signup/Signup'));
const Login = lazy(() => import('./components/Login/Login'));
const Profile = lazy(() => import('./components/Profile'));

const CreateTournament = lazy(() => import('./components/Tournament/CreateTournament'));
const Tournament = lazy(() => import('./components/Tournament/Tournament'));
const AddTeam = lazy(() => import('./components/Tournament/AddTeam'));
const ScheduleMatch = lazy(() => import('./components/Tournament/ScheduleMatch'));

const Team = lazy(() => import('./components/Team/Team'));
const AddPlayer = lazy(() => import('./components/Team/AddPlayer'));
const Player = lazy(() => import('./components/Team/Player'));


function App() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    uid: ""
  })
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser((prev) => ({ ...prev, name: user.displayName, email: user.email, uid: user.uid }));
      } else {
        setUser({
          name: "",
          email: "",
          uid: ""
        })
      }
    });
  }, []);

  return (
    <>

      <BrowserRouter>
        <Navbar user={user} />

        <Routes>

          <Route path="/*" element={<Home />} />
          <Route path="/signup" element={<Suspense><Signup /></Suspense>} />
          <Route path="/login" element={<Suspense><Login /></Suspense>} />
          <Route path="/profile" element={<Suspense><Profile user={user} /></Suspense>} />

          <Route path="/createtournament" element={<Suspense><CreateTournament user={user} /></Suspense>} />
          <Route path="/tournament" element={<Suspense><Tournament /></Suspense>} />
          <Route path="/addteam" element={<Suspense><AddTeam /></Suspense>} />
          <Route path="/scheduleMatch" element={<Suspense><ScheduleMatch /></Suspense>} />

          <Route path="/team" element={<Suspense><Team /></Suspense>} />
          <Route path="/addplayer" element={<Suspense><AddPlayer /></Suspense>} />
          <Route path="/player" element={<Suspense><Player /></Suspense>} />
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
