import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Home/Footer';
import Navbar from './components/Home/Navbar';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Profile from './components/Profile';
import Logout from './components/Login/Logout';
import CreateTournament from './components/Tournament/CreateTournament';
import Tournament from './components/Tournament/Tournament';
import AddTeam from './components/Tournament/AddTeam';
import ScheduleMatch from './components/Tournament/ScheduleMatch';

import Team from './components/Team/Team';
import AddPlayer from './components/Team/AddPlayer';
import Player from './components/Team/Player';

import { ThemeProvider } from '@material-ui/core'
import { theme } from './components/ui/Theme'
import Container from './main/Container'

import { auth } from "./firebase";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setName(user.displayName);
        setEmail(user.email);
      } else {
        setName("");
        setEmail("");
      }
    });
  }, []);

  return (
    <>

      <BrowserRouter>
        <Navbar />

        <Routes>

          <Route path="/*" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile name={name} email={email} />} />

          <Route path="/createtournament" element={<CreateTournament email={email} />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/addteam" element={<AddTeam />} />
          <Route path="/scheduleMatch" element={<ScheduleMatch />} />

          <Route path="/team" element={<Team />} />
          <Route path="/addplayer" element={<AddPlayer />} />
          <Route path="/player" element={<Player />} />
          <Route path="/match/*" element={<ThemeProvider theme={theme}>
            <Container />
          </ThemeProvider>} />


        </Routes>

        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;
