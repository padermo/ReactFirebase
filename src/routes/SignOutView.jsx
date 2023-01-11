import React, {useState} from "react";
import AuthProvider from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { logout } from '../firebase/firebase';

function SignOutView() {
  const navigate = useNavigate();

  const handleUserLoggedIn = async (user) => {
    await logout();
  };

  const handleUserNotRegistered = (user) => {
    navigate("/login");
  };

  const handleUserNotLoggedIn = () => {
    navigate("/login");
  };

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    ></AuthProvider>
  );
}

export default SignOutView;
