/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, {useContext} from 'react';
import getYouTubeVideoId from '../utils/getYoutubeVideoId';
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import getAgentImage from '../utils/getAgentImage';
import getMapImage from '../utils/getMapImage';

export default function LineUpCard({lineup, handleDeleteLineup, handleLikes}) {
    const { user } = useContext(AuthContext)
    return (
        <div className='lineup-card-details'>
          <h1>{lineup.title}</h1>
          <div className='lineup-agent'>
          <img src={getAgentImage(lineup.agent)} alt={lineup.agent} />
          <h4>{lineup.agent}</h4>
          </div>
          <div className='lineup-map'>
            <img src={getMapImage(lineup.map)} alt={lineup.map} />
            <h4>{lineup.map}</h4>
            </div>
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(
              lineup.video
            )}`}
          ></iframe>
          <div className='lineup-info-details'>
          {lineup.author && (
            <Link className='lineup-user' to={user ? `/profile/${lineup.author._id}` : '/login' }>
            <img src={lineup.author.image} alt={lineup.author.username} />
              <p>{lineup.author.username}</p>
            </Link>
          )}
          <div className='lineup-like-1'>
          <form onClick={() => handleLikes(lineup._id)}>{lineup.isLiked ? <AiFillHeart size={20} color="red" /> : <AiOutlineHeart size={20}/>}</form>
            <p>{lineup.numberOfLikes}</p>
            </div>
          </div>
          {user && user._id === lineup.author._id && <div className='lineup-user-actions'>
          <button onClick={() => handleDeleteLineup(lineup._id)}>Delete</button>
          <Link to={`/lineup/${lineup._id}/edit`}>Edit</Link>
          </div>}
        </div>
    )
}