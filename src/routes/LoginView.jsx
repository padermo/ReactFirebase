import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, userExists } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import style from './loginView.module.css';

function LoginView() {
  // useNavigate es un hook de react router dom que me permite redirigir a los usuarios a diversas partes del sitio
  const navigate = useNavigate();

  // const [currentUser, setCurrentUser] = useState(null);

  /* state 
  0 -> inicializado
  1 -> loading
  2 -> login completo
  3 -> login sin registro
  4 -> no hay nadie logueado
  5 -> ya existe username
  6 -> nuevo username, click para continuar
  */
  const [state, setCurrentState] = useState(0);

  // con esto detectamos si el usuario ya esta logeado
  // useEffect(()=>{
  //   setCurrentState(1);
  //   onAuthStateChanged(auth, handleUserStateChanged);
  // },[])

  // // obtenemos la informacion del usuario logueado actual
  // const handleUserStateChanged = async (user) => {
  //   if(user){
  //     const isRegistered = await userExists(user.uid)
  //     if(isRegistered){
  //       // si ya esta registrado redirigimos a dashboard
  //       navigate('/dashboard');
  //       setCurrentState(2);
  //     }else{
  //       // si no esta registrado redirigimos a choose username
  //       navigate('/choose-username');
  //       setCurrentState(3);
  //     }
  //   }else{
  //     setCurrentState(4);
  //     console.log('No hay nadie autenticado...');
  //   }
  // }

  // cuando haga clic al boton de login with google me va a abrir un popup para seleccionar la cuenta de google
  const handleOnClick = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);
  };

  const signInWithGoogle = async (googleProvider) => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserLoggedIn = (user) => {
    navigate("/dashboard");
  };

  const handleUserNotRegistered = (user) => {
    navigate("/choose-username");
  };

  const handleUserNotLoggedIn = () => {
    setCurrentState(4);
  };

  // if(state === 2){
  //   return <div>Estas autenticado y registrado</div>
  // }

  // if(state === 3){
  //   return <div>Estas autenticado pero no registrado</div>
  // }

  if (state === 4) {
    return (
      <div className={style.loginView}>
        <button className={style.provider} onClick={handleOnClick}>Login with Google</button>
      </div>
    );
  }


  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
      <div>Loading...</div>
    </AuthProvider>
  );
}

export default LoginView;
