import React, { useEffect } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {

    signOut(auth).then(() => {
      alert("Logout Successfully");
      navigate('/');
      return;
    }).catch((err) => {
      console.error(err);
      alert(err.message);
      navigate('/profile');
    });

  }, []);

}
