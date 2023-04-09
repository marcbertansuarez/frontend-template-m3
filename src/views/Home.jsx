/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, {useState, useEffect, useContext} from 'react';
import lineupService from '../services/lineupService';
import likeService from '../services/likeService';
import { Link, useNavigate } from 'react-router-dom';
import getYouTubeVideoId from '../utils/getYoutubeVideoId';
import { AuthContext } from '../context/AuthContext';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import getAgentImage from '../utils/getAgentImage';
import getMapImage from '../utils/getMapImage';
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { ImEyePlus } from 'react-icons/im';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { GrEdit } from 'react-icons/gr';
import Loading from '../components/Loading';

export default function Home() {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [lineups, setLineups] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  
  const getLineups = async () => {
    try {
      const response = await lineupService.getLineUps();
      setLineups(response)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

    useEffect(() => {
      getLineups()
    }, []) 

    const handleLikes = async (lineupId) => {
      if (!user) {
        navigate('/login');
      }
      try {
        await likeService.createLike(lineupId);
        getLineups();
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
    };

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
      <h1 className='lineup-h1'>Home</h1>
      {isLoading && <Loading />}
      <div>
      <form className="form-search" onSubmit={handleSubmitSearch}>
        <div className='form-search-input'>
        <input type="text" name="agent" onChange={handleChange} placeholder='Search for agent...'/>
        <button className="form-search-btn1" type="submit">Search</button>
        <button className='form-search-btn2' type="button" onClick={handleClearSearch}>Clear</button>
        </div>
      </form>
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
            <form onClick={() => handleLikes(elem._id)}>{elem.isLiked ? <AiFillHeart size={20} color="red" /> : <AiOutlineHeart size={20}/>}</form>
            <p>{elem.numberOfLikes}</p> 
            </div>
            <Link to={`/lineup/${elem._id}`}><ImEyePlus size={20} color='white'/></Link>
            </div>
            </div>
            {user && user._id === elem.author._id && (
              <div className='lineup-user-actions'>
              <Link to={`/lineup/${elem._id}/edit`}><GrEdit /></Link>
              <button onClick={() => handleDelete(elem._id)}><RiDeleteBin5Line /></button>
              </div>)}
          </div>
        )
      })}
      </div>
      {user && <Link to={'/lineup/create'}><MdOutlineAddCircleOutline /></Link>}
    </div>
  )
}
