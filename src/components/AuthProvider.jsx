import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import React, {useEffect, useState} from 'react'
import { auth, getUserInfo, registerNewUser, userExists } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom';

function AuthProvider({children, onUserLoggedIn, onUserNotLoggedIn, onUserNotRegistered}) {
  const navigate = useNavigate()

  useEffect(()=>{
    onAuthStateChanged(auth, handleUserStateChanged);
  },[]);

  // obtenemos la informacion del usuario logueado actual
  const handleUserStateChanged = async (user) => {
    if(user){
      const isRegistered = await userExists(user.uid)
      if(isRegistered){
        // si ya esta registrado redirigimos a dashboard
        const userInfo = await getUserInfo(user.uid);
        if(userInfo.processCompleted){
          onUserLoggedIn(userInfo);
        }else{
          onUserNotRegistered(userInfo);
        }
      }else{
        // si no esta registrado redirigimos a choose username
        await registerNewUser({
          uid: user.uid,
          displayName: user.displayName,
          profilePicture: '',
          username: '',
          processCompleted: false
        });
        onUserNotRegistered(user);
      }
    }else{
      onUserNotLoggedIn();
    }
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default AuthProvider