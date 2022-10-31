import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Profile from './components/Profile';
import Logout from './components/Logout';
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
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
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
          <Route path="/profile" element={<Profile name={userName} />} />

          <Route path="/createtournament" element={<CreateTournament />} />
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
