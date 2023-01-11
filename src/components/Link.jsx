import React, { useState, useRef, useEffect } from "react";
import style from './link.module.css';

function Link({ docId, title, url, onDelete, onUpdate }) {
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentUrl, setCurrentUrl] = useState(url);

  const [editTitle, setEditTitle] = useState(false);
  const [editUrl, setEditUrl] = useState(false);

  const titleRef = useRef(null);
  const urlRef = useRef(null);

  useEffect(()=> {
    if(titleRef.current){
      titleRef.current.focus();
    }
  },[editTitle]);

  useEffect(()=> {
    if(urlRef.current){
      urlRef.current.focus();
    }
  },[editUrl]);

  const handleEditTitle = () => {
    setEditTitle(true);
  };

  const handleEditUrl = () => {
    setEditUrl(true);
  };

  const handleChangeTitle = (e) => {
    setCurrentTitle(e.target.value);
  };

  const handleChangeUrl = (e) => {
    setCurrentUrl(e.target.value);
  };

  const handleBlurTitle = (e) => {
    setEditTitle(false);
    onUpdate(docId, currentTitle, currentUrl);
  };

  const handleBlurUrl = (e) => {
    setEditUrl(false);
    onUpdate(docId, currentTitle, currentUrl);
  };

  const handleDelete = () => {
    onDelete(docId);
  }

  return (
    <div className={style.link}>
      <div className={style.linkInfo}>
        <div className={style.linkTitle}>
          {editTitle ? (
            <>
              <input
                ref={titleRef}
                type="text"
                value={currentTitle}
                onChange={handleChangeTitle}
                onBlur={handleBlurTitle}
              />
            </>
          ) : (
            <>
              <button className={style.btnEdit} onClick={handleEditTitle}><span className="material-icons">edit</span></button>
              {currentTitle}
            </>
          )}
        </div>
        <div className={style.linkUrl}>
          {editUrl ? (
            <>
              <input
                ref={urlRef}
                type="text"
                value={currentUrl}
                onChange={handleChangeUrl}
                onBlur={handleBlurUrl}
              />
            </>
          ) : (
            <>
              <button className={style.btnEdit} onClick={handleEditUrl}><span className="material-icons">edit</span></button>
              {currentUrl}
            </>
          )}
        </div>
      </div>

      <div className={style.linkActions}>
        <button className={style.btnDelete} onClick={handleDelete}><span className="material-icons">delete</span></button>
      </div>
    </div>
  );
}

export default Link;
