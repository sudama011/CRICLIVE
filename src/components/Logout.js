import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    navigate('/');
  }).catch((error) => {
    console.error(error);
    navigate('/profile');
    // An error happened.
  });

  return (
    <div>
      Sign-out
    </div>
  )
}
