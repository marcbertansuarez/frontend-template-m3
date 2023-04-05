/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, {useState, useEffect, useContext} from 'react';
import profileService from '../../services/profileService';
import lineupService from '../../services/lineupService';
import likeService from '../../services/likeService';
import { Link, useNavigate } from 'react-router-dom';
import getYouTubeVideoId from '../../utils/getYoutubeVideoId';
import { AuthContext } from '../../context/AuthContext';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import getAgentImage from '../../utils/getAgentImage';
import getMapImage from '../../utils/getMapImage';

export default function ProfileView() {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [lineups, setLineups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  const getProfile = async () => {
    try {
      const response = await profileService.getProfile();
      setProfile(response.user)
      setLineups(response.lineupLikes)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  

    useEffect(() => {
      getProfile()
    }, []) 

    const handleLikes = async (lineupId) => {
      if (!user) {
        navigate('/login');
      }
      try {
        await likeService.createLike(lineupId);
        getProfile();
      } catch (error) {
        console.log(error)
      }
    };

    const handleDelete = async (lineupId) => {
      try {
        await lineupService.deleteLineUp(lineupId);
        setLineups(lineups.filter(lineup => lineup._id !== lineupId));
      } catch (error) {
        console.log(error)
      }
    }

    
  return (
    <div>
      {isLoading && <div>LOADING...</div>}
      {profile && <div>
        <h3>{profile.username}</h3>
        <img style={{width: "20px"}} src={profile.image} alt={profile.username} />
      </div>}
      <Link to="/profile/edit">Edit profile</Link>
      <Link to="/profile/liked">Liked LineUps</Link>
      <div>
      {lineups && !isLoading && lineups.map(elem => {
        return (
          <div key={elem._id}>
            <h1>{elem.title}</h1>
            <div>
            <img style={{width: "40px"}} src={getAgentImage(elem.agent)} alt={elem.agent} />
            <h4>{elem.agent}</h4>
            </div>
            <div>
            <img style={{width: "250px"}} src={getMapImage(elem.map)} alt={elem.map} />
            <h4>{elem.map}</h4>
            </div>
            <iframe src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    elem.video
                  )}`}></iframe>
            
            <form onClick={() => handleLikes(elem._id)}>{elem.isLiked ? <AiFillHeart size={20} color="red" /> : <AiOutlineHeart size={20}/>}</form>
            <p>Likes: {elem.numberOfLikes}</p> 
            <Link to={`/profile/${elem.author._id}`}><p>{elem.author.username}</p></Link>
            <Link to={`/lineup/${elem._id}`}>See more</Link>
            {user && user._id === elem.author._id && (
              <div>
              <button onClick={() => handleDelete(elem._id)}>Delete</button>
              <Link to={`/lineup/${elem._id}/edit`}>Edit</Link>
              </div>)}
          </div>
        )
      })}
      </div>
      {user && <Link to={'/lineup/create'}>Create new Line Up</Link>}
    </div>
  )
}