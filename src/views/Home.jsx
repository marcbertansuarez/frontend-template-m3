/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, {useState, useEffect} from 'react';
import lineupService from '../services/lineupService';
import { Link } from 'react-router-dom';

function getYouTubeVideoId(url) {
  const regex = /(?:v=|youtu\.be\/)([\w-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}


export default function Home() {

  const [lineups, setLineups] = useState([]);
  
  const getLineups = async () => {
    try {
      const response = await lineupService.getLineUps();
      setLineups(response)
    } catch (error) {
      console.log(error);
    }
  }

    useEffect(() => {
      getLineups()
    }, [])


  
  return (
    <div>
      <h1>Home</h1>
      <div>
      {lineups && lineups.map(elem => {
        return (
          <div key={elem._id}>
            <h1>{elem.title}</h1>
            <h4>{elem.agent}</h4>
            <h4>{elem.map}</h4>
            <iframe src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    elem.video
                  )}`}></iframe>   
            <Link to={`/profile/${elem.author._id}`}><p>{elem.author.username}</p></Link>
            <Link to={`/lineup/${elem._id}`}>See more</Link>
          </div>
        )
      })}
      </div>
    </div>
  )
}
