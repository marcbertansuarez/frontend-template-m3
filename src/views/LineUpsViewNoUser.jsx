/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, {useState, useEffect, useContext} from 'react';
import lineupService from '../services/lineupService';
import { Link, useNavigate } from 'react-router-dom';
import getYouTubeVideoId from '../utils/getYoutubeVideoId';
import { AuthContext } from '../context/AuthContext';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import getAgentImage from '../utils/getAgentImage';
import getMapImage from '../utils/getMapImage';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { ImEyePlus } from 'react-icons/im';
import Loading from '../components/Loading';
import { FaSearch } from 'react-icons/fa';

export default function LineUpsViewNoUser() {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [lineups, setLineups] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  
  const getLineups = async () => {
    try {
      const response = await lineupService.getLineUpsNoUser();
      setLineups(response)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

    useEffect(() => {
      getLineups()
    }, []) 

    const handleChange = (e) => {
      setSearch(e.target.value);
    }

    const handleSubmitSearch = async (e) => {
      setIsLoading(true);
      e.preventDefault();
      try {
        const response = await lineupService.searchLineUp(search);
        setLineups(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error)
      }
    };

    const handleClearSearch = async () => {
      setSearch('')
      getLineups();
    }

    
  return (
    <div>
    {isLoading && <Loading />}
    <div>
    {!isLoading && <div>
      <h1 className='lineup-h1'>Find LineUps</h1>
      <div className='form-search-general'>
      <form className="form-search" onSubmit={handleSubmitSearch}>
        <div className='form-search-input'>
        <div className='form-search-1'>
        <input type="text" name="agent" onChange={handleChange} placeholder='Search for agent...'/>
        <button type="submit"><FaSearch /></button>
        </div>
        <button className='form-search-btn2' type="button" onClick={handleClearSearch}>Clear</button>
        </div>
      </form>
      </div>
      </div>}
      <div className='lineup-view'>
      {lineups && !isLoading && lineups.map(elem => {
        return (
          <div className="lineup-card" key={elem._id}>
            <h1>{elem.title}</h1>
            <div className='lineup-agent'>
            <img src={getAgentImage(elem.agent)} alt={elem.agent} />
            <h4>{elem.agent}</h4>
            </div>
            <div className='lineup-map'>
            <img src={getMapImage(elem.map)} alt={elem.map} />
            <h4>{elem.map}</h4>
            </div>
            <iframe src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    elem.video
                  )}`}></iframe>
            <div className='lineup-info'>
            <Link className='lineup-user' to={user ? `/profile/${elem.author._id}` : '/login' }>
            <img src={elem.author.image} alt={elem.author.username} />
            <p>{elem.author.username}</p>
            </Link>
            <div className='lineup-like'>
            <div className='lineup-like-1'>
            <form onClick={() => navigate("/login")}>{elem.isLiked ? <AiFillHeart size={20} color="red" /> : <AiOutlineHeart size={20}/>}</form>
            <p>{elem.numberOfLikes}</p> 
            </div>
            <Link to="/login"><ImEyePlus size={20} color='white'/></Link>
            </div>
            </div>
          </div>
        )
      })}
      </div>
      </div>
      <div className='create'>
      <Link className='create-lineup' to={'/login'}><MdOutlineAddCircleOutline size={50} color='white' /></Link> 
      </div>
    </div>
  )
}