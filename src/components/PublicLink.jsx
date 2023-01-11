import React from "react";
import style from './publicLink.module.css';

function PublicLink({url, title}) {
  return (
    <div>
      <a href={url} className={style.publicLinkContainer}>{title}</a>
    </div>
  );
}

export default PublicLink;
