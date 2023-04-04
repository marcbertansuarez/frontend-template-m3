/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, {useContext} from 'react';
import getYouTubeVideoId from '../utils/getYoutubeVideoId';
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';

export default function LineUpCard({lineup, handleDeleteLineup}) {
    const { user } = useContext(AuthContext)
    return (
        <div>
          <h1>{lineup.title}</h1>
          <h4>{lineup.agent}</h4>
          <h4>{lineup.map}</h4>
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(
              lineup.video
            )}`}
          ></iframe>
          {lineup.author && (
            <Link to={`/profile/${lineup.author._id}`}>
              {lineup.author.username}
            </Link>
          )}
          {user && user._id === lineup.author._id && <div>
          <button onClick={() => handleDeleteLineup(lineup._id)}>Delete</button>
          <Link to={`/lineup/${lineup._id}/edit`}>Edit</Link>
          </div>}
        </div>
    )
}