import React, { useState, useEffect, useContext } from 'react';
import lineupService from '../services/lineupService';
import getRankImage from '../utils/getRankImage.js';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function RankingView() {

    const { user } = useContext(AuthContext);
    const [ranking, setRanking] = useState([]);

    const getRanking = async () => {
        const response = await lineupService.getRanking();
        setRanking(response);
    };

    useEffect(() => {
        getRanking()
    }, []);  

    return (
        <div className='ranking'>
        <h1>Ranking</h1>
        {ranking && ranking.map((elem, index) => {
            return (
                <div className='ranking-user' key={elem._id}>
                <img className='rank-image' src={getRankImage(index)} alt="rank-img" />
                <Link to={user ? `/profile/${elem._id}` : "/login"}>
                <img src={elem.image} alt={elem.username} />
                <h3>{elem.username}</h3>
                </Link>
                <p>Total LineUps: {elem.numLineUps}</p>
                </div>
            )
        })}
        </div>
    )
}