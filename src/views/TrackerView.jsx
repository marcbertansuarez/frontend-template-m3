import React, { useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import ErrorPage from './ErrorPage';

export default function TrackerView() {

    const [playerName, setPlayerName] = useState('')
    const [tagPlayer, setTagPlayer] = useState('');
    const [player, setPlayer] = useState({});
    const [playerInfo, setPlayerInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleChangeName = (e) => {
        setPlayerName(e.target.value)
    };

    const handleChangeTag = (e) => {
        setTagPlayer(e.target.value)
    };

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.henrikdev.xyz/valorant/v1/account/${playerName}/${tagPlayer}`)
            setPlayer(response.data)
            const response2 = await axios.get(`https://api.henrikdev.xyz/valorant/v1/mmr/eu/${playerName}/${tagPlayer}`)
            setPlayerInfo(response2.data);
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setError(true);
            setIsLoading(false);
        }
    };

    
    return (
        <div>
        <button className="goback-btn" onClick={() => navigate(-1) }><IoMdArrowRoundBack size={30} color='white'/></button>
        <div className='general-form-edit'>
        <h1>Tracker Players</h1>
        <div className='form-tracker'>
            <form onSubmit={handleSubmit}>
            <div className='form-tracker-1'>
                <label>Player name</label>
                <input type="text" name="name" value={playerName} onChange={handleChangeName}/>
                </div>
                <div className='form-tracker-1'>
                <label>Tag</label>
                <input type="text" name="tag" value={tagPlayer} onChange={handleChangeTag}/>
                </div>
                <button type="submit">Find player</button>
            </form>
        </div>
        {isLoading && <Loading />}
        {error && <ErrorPage />}
        {player && playerInfo.data && <div className='tracker-info'>
            <h3>{player.data.name} {player.data.tag}</h3>
            <div className='tracker-info-1'>
                <p>Account level: <b>{player.data.account_level}</b></p>
                <p>Rank: <b>{playerInfo.data.currenttierpatched}</b></p>
                <img src={playerInfo.data.images.small} alt={player.data.name} />
            </div>
            <img className='tracker-img' src={player.data.card.large} alt={player.data.name} />
        </div>}
        </div>
        </div>
    )
}