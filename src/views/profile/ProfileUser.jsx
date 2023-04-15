/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, {useState, useEffect, useContext} from 'react';
import profileService from '../../services/profileService';
import likeService from '../../services/likeService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import getYouTubeVideoId from '../../utils/getYoutubeVideoId';
import { AuthContext } from '../../context/AuthContext';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import getAgentImage from '../../utils/getAgentImage';
import getMapImage from '../../utils/getMapImage';
import { ImEyePlus } from 'react-icons/im';
import Loading from '../../components/Loading';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { IoMdArrowRoundBack } from 'react-icons/io';
import ErrorPage from '../ErrorPage';

export default function ProfileUser() {

  const { user } = useContext(AuthContext);
  const { userId } = useParams()
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [lineups, setLineups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  
  const getProfileUser = async () => {
    try {
      const response = await profileService.getProfileUser(userId);
      setProfile(response.user)
      setLineups(response.lineupLikes)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
    }
  }
  

    useEffect(() => {
      getProfileUser()
      // eslint-disable-next-line
    }, [userId]) 
    
    const handleLikes = async (lineupId) => {
      if (!user) {
        navigate('/login');
      }
      try {
        await likeService.createLike(lineupId);
        getProfileUser();
      } catch (error) {
        console.log(error)
        setError(true);
      }
    };

    
  return (
    <div className='profile-user'>
    {isLoading && <Loading />}
    {error && <ErrorPage />}
    <button className="goback-btn" onClick={() => navigate(-1) }><IoMdArrowRoundBack size={30} color='white'/></button>
    {profile && <div className='user'>
    <div className='user-1'>
    <img src={profile.image} alt={profile.username} />
      <Link className='user-name-link' to="/profile"><h3>{profile.username}</h3></Link>
      </div>
    </div>}
    {lineups.length === 0 && <div>No lineup's liked</div>}
    <div className='lineup-view'>
    {lineups && !isLoading && lineups.map(elem => {
      return (
        <div className='lineup-card' key={elem._id}>
          <h1>{elem.title}</h1>
          <div className='lineup-agent'>
          <img src={getAgentImage(elem.agent)} alt={elem.agent} />
          <h4>{elem.agent}</h4>
          </div>
          <div className='lineup-map'>
          <img src={getMapImage(elem.map)} alt={elem.map} />
          <h4>{elem.map}</h4>
          </div>
          <div className='iframe-container'>
            <iframe className='video-iframe' src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    elem.video
                  )}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" allowFullScreen></iframe>
                  </div>
                <div className='lineup-info'>
          <Link className='lineup-user' to={`/profile/${elem.author._id}`}>
          <img src={elem.author.image} alt={elem.author.username} />
          <p>{elem.author.username}</p>
          </Link>
          <div className='lineup-like'>
          <div className='lineup-like-1'>
          <form onClick={() => handleLikes(elem._id)}>{elem.isLiked ? <AiFillHeart size={20} color="red" /> : <AiOutlineHeart size={20}/>}</form>
          <p>{elem.numberOfLikes}</p> 
          </div>
          <Link to={`/lineup/${elem._id}`}><ImEyePlus color='white'/></Link>
          </div>
          </div>
        </div>
      )
    })}
    </div>
    {user && <div className='create'> <Link className='create-lineup' to={'/lineup/create'}><MdOutlineAddCircleOutline size={50} color='white' /></Link> </div>}
  </div>
  )
}