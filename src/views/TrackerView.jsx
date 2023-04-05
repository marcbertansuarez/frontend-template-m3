import React, { useState } from 'react';
import axios from 'axios';

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
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <label>Player name</label>
                <input type="text" name="name" value={playerName} onChange={handleChangeName}/>
                <label>Tag</label>
                <input type="text" name="tag" value={tagPlayer} onChange={handleChangeTag}/>
                <button type="submit">Find player</button>
            </form>
        </div>
        {isLoading && <div>LOADING...</div>}
        {player && playerInfo.data && <div>
            <h3>{player.data.name}{player.data.tag}</h3>
            <div>
                <p>Account level: {player.data.account_level}</p>
                <p>Rank: {playerInfo.data.currenttierpatched}</p>
                <img src={playerInfo.data.images.small} alt={player.data.name} />
            </div>
            <img src={player.data.card.large} alt={player.data.name} />
        </div>}
        </>
    )
}