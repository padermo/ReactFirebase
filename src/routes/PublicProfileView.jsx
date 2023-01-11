import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { existsUsername, getProfilePhotoUrl, getUserPublicProfileInfo } from '../firebase/firebase'
import PublicLink from '../components/PublicLink';
import style from './publicProfileView.module.css';
import styleLinks from '../components/publicLink.module.css'

function PublicProfileView() {
  const params = useParams();

  const [profile, setProfile] = useState(null);
  const [url, setUrl] = useState('');
  const [state, setState] = useState(0);

  useEffect(()=> {
    getProfile();

    async function getProfile() {
      const username = params.username;
      try {
        const userUid = await existsUsername(username);

        if(userUid){
          const userInfo = await getUserPublicProfileInfo(userUid);
          setProfile(userInfo);

          const url = await getProfilePhotoUrl(userInfo.profileInfo.profilePicture);
          setUrl(url);
        }else{
          setState(7)
        }
      } catch (error) {
        
      }
    }
  },[params]);

  if(state === 7){
    return(
      <div>
        <h1>Username doesn't exists</h1>
      </div>
    )
  }

  return (
    <div className={style.profileContainer}>
      <div className={style.profilePicture}>
        <img src={url} alt="img" />
      </div>

      <h2>{profile?.profileInfo.username}</h2>
      <h3>{profile?.profileInfo.displayName}</h3>

      <div className={styleLinks.publicLinksContainer}>
        {
          profile?.linksInfo.map(link => (
            <PublicLink key={link.docId} title={link.title} url={link.url} />
          ))
        }
      </div>
    </div>
  )
}

export default PublicProfileView