import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import NoPage from "./pages/NoPage";
import Home from './components/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Profile from './components/Profile';
import Logout from './components/Logout';

import { auth } from "./firebase";
import style from "./components/Style.css"

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
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile name={userName} />} />
          <Route path="*" element={<NoPage />} />
        </Routes>

        <Footer />
      </BrowserRouter>

    </>
  );
}

export default App;
