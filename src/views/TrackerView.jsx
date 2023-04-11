import React, { useState } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';

export default function TrackerView() {

    const [playerName, setPlayerName] = useState('')
    const [tagPlayer, setTagPlayer] = useState('');
    const [player, setPlayer] = useState({});
    const [playerInfo, setPlayerInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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
        }
    };

    
    return (
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
        {player && playerInfo.data && <div>
            <h3>{player.data.name}{player.data.tag}</h3>
            <div>
                <p>Account level: {player.data.account_level}</p>
                <p>Rank: {playerInfo.data.currenttierpatched}</p>
                <img src={playerInfo.data.images.small} alt={player.data.name} />
            </div>
            <img src={player.data.card.large} alt={player.data.name} />
        </div>}
        </div>
    )
}