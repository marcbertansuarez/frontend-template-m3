/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, {useState, useEffect, useContext} from 'react';
import profileService from '../../services/profileService';
import likeService from '../../services/likeService';
import { Link, useNavigate } from 'react-router-dom';
import getYouTubeVideoId from '../../utils/getYoutubeVideoId';
import { AuthContext } from '../../context/AuthContext';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';

export default function ProfileLikedView() {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [lineups, setLineups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  const getProfileLiked = async () => {
    try {
      const response = await profileService.getProfileLiked();
      setProfile(response.user)
      setLineups(response.likedLineUps)
      console.log(response.user)
      console.log(response.likedLineUps)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  

    useEffect(() => {
      getProfileLiked()
    }, []) 

    const handleLikes = async (lineupId) => {
      if (!user) {
        navigate('/login');
      }
      try {
        await likeService.createLike(lineupId);
        getProfileLiked();
      } catch (error) {
        console.log(error)
      }
    };

    
  return (
    <div>
      {isLoading && <div>LOADING...</div>}
      {profile && <div>
        <h3>{profile.username}</h3>
        <img style={{width: "20px"}} src={profile.image} alt={profile.username} />
      </div>}
      <div>
      {lineups && !isLoading && lineups.map(elem => {
        return (
          <div key={elem._id}>
            <h1>{elem.title}</h1>
            <h4>{elem.agent}</h4>
            <h4>{elem.map}</h4>
            <iframe src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    elem.video
                  )}`}></iframe>
            
            <form onClick={() => handleLikes(elem._id)}>{elem.isLiked ? <AiFillHeart size={20} color="red" /> : <AiOutlineHeart size={20}/>}</form>
            <p>Likes: {elem.numberOfLikes}</p> 
            {/* <Link to={`/profile/${elem.author._id}`}><p>{elem.author.username}</p></Link> */}
            <Link to={`/lineup/${elem._id}`}>See more</Link>
          </div>
        )
      })}
      </div>
      {user && <Link to={'/lineup/create'}>Create new Line Up</Link>}
    </div>
  )
}