import React, { useState } from "react";
import AuthProvider from "../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import DashboardWrapper from "../components/DashboardWrapper";
import { v4 as uuidv4 } from "uuid";
import {
  getLinks,
  insertNewLink,
  updateLink,
  deleteLink,
} from "../firebase/firebase";
import Link from "../components/Link";
import style from "./dashboardView.module.css";
import styleLinks from "../components/link.module.css";

function DashboardView() {
  const [currentUser, setCurrentUser] = useState({});
  const [state, setState] = useState(0);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);

  const navigate = useNavigate();

  const handleUserLoggedIn = async (user) => {
    setCurrentUser(user);
    setState(2);
    const resLinks = await getLinks(user.uid);
    setLinks([...resLinks]);
  };

  const handleUserNotRegistered = (user) => {
    navigate("/login");
  };

  const handleUserNotLoggedIn = () => {
    navigate("/login");
  };

  if (state === 0) {
    return (
      <AuthProvider
        onUserLoggedIn={handleUserLoggedIn}
        onUserNotLoggedIn={handleUserNotLoggedIn}
        onUserNotRegistered={handleUserNotRegistered}
      >
        Loading...
      </AuthProvider>
    );
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addLink();
  };

  const addLink = () => {
    if (title !== "" && url !== "") {
      const newLink = {
        id: uuidv4(),
        title: title,
        url: url,
        uid: currentUser.uid,
      };
      const res = insertNewLink(newLink);
      newLink.docId = res.id;
      setTitle("");
      setUrl("");
      setLinks([...links, newLink]);
    }
  };

  const handleOnChange = (e) => {
    const value = e.target.value;
    if (e.target.name === "title") {
      setTitle(value);
    }

    if (e.target.name === "url") {
      setUrl(value);
    }
  };

  const handleDeleteLink = async (docId) => {
    await deleteLink(docId);
    const tmp = links.filter((link) => link.docId !== docId);
    setLinks([...tmp]);
  };

  const handleUpdateLink = async (docId, title, url) => {
    const link = links.find((item) => item.docId === docId);
    link.title = title;
    link.url = url;
    await updateLink(docId, link);
  };

  return (
    <DashboardWrapper>
      <div>
        <h1>Dashboard</h1>

        <form className={style.entryContainer} onSubmit={handleOnSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleOnChange}
            className="input"
          />

          <label htmlFor="url">Url</label>
          <input
            type="text"
            name="url"
            id="url"
            onChange={handleOnChange}
            className="input"
          />

          <input type="submit" value="Create new link" className="btn" />
        </form>

        <div className={styleLinks.linksContainer}>
          {links.map((link) => (
            <Link
              key={link.docId}
              docId={link.docId}
              url={link.url}
              title={link.title}
              onUpdate={handleUpdateLink}
              onDelete={handleDeleteLink}
            />
          ))}
        </div>
      </div>
    </DashboardWrapper>
  );
}

export default DashboardView;
