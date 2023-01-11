import React, { useState } from "react";
import AuthProvider from "../components/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { existsUsername, updateUser } from "../firebase/firebase";
import style from './chooseUsername.module.css'

function ChooseUsernameView() {
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const handleUserLoggedIn = (user) => {
    navigate("/dashboard");
  };

  const handleUserNotRegistered = (user) => {
    setState(3);
    setCurrentUser(user);
  };

  const handleUserNotLoggedIn = () => {
    navigate("/login");
  };

  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleContinue = async () => {
    if (username !== "") {
      const exists = await existsUsername(username);
      if (exists) {
        setState(5);
      } else {
        const tmp = { ...currentUser };
        tmp.username = username;
        tmp.processCompleted = true;
        await updateUser(tmp);
        setState(6);
      }
    }
  };

  if (state === 3 || state === 5) {
    return (
      <div className={style.chooseUsernameContainer}>
        <h1>Bienvenido {currentUser.displayName}</h1>
        <p>Para terminar el proceso elige un nombre de usuario</p>
        {state === 5 ? <p>El nombre de usuario ya existe</p> : ""}
        <div>
          <input className="input" type="text" onChange={handleInputUsername} />
        </div>

        <div>
          <button className="btn" onClick={handleContinue}>Continue</button>
        </div>
      </div>
    );
  }

  if (state === 6) {
    return (
      <div className={style.chooseUsernameContainer}>
        <h1>Felicidades! ya puedes ir al dashboard</h1>
        <Link to="/dashboard">Continuar</Link>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    ></AuthProvider>
  );
}

export default ChooseUsernameView;
