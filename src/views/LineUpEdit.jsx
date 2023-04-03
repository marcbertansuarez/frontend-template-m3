import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import lineupService from '../services/lineupService';

export default function LineUpEdit() {

    const { lineupId } = useParams();

    const [lineup, setLineup] = useState({
        title: '',
        agent: '',
        map: '',
        description: '',
        video: ''
    });

    const agents = ['Astra', 'Breach', 'Brimstone', 'Chamber', 'Cypher', 'Fade', 'Guekko', 'Harbor', 'Jett', 'KAY/O', 'Killjoy', 'Neon', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Skye', 'Sova', 'Viper', 'Yoru'];
    const maps = ['Bind', 'Haven', 'Split', 'Ascent', 'Icebox', 'Breeze', 'Fracture', 'Pearl', 'Lotus']

    const navigate = useNavigate();

    const getLineup = async () => {
        try {
            const response = await lineupService.getLineUp(lineupId);
            setLineup(response.lineup);
        } catch (error) {
            console.log(error);
        }
    } 
    console.log(lineup)

    useEffect(() => {
        getLineup()
        // eslint-disable-next-line
    }, [lineupId]);

    const handleChange = (e) => {
        setLineup(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await lineupService.editLineUp(lineupId, lineup);
            navigate(`/lineup/${lineupId}`)
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div>
            <h2>Editing {lineup.title}</h2>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" name="title" value={lineup.title} onChange={handleChange}/>
                <label>Agent</label>
                <select name="agent" onChange={handleChange} value={lineup.agent} >
                {agents.map(agent => {
                    return (
                        <option key={agent} value={agent}>{agent}</option>
                    )
                })}
                </select>
                <label>Map</label>
                <select name="map" onChange={handleChange} value={lineup.map}>
                    {maps.map(map => {
                        return (
                            <option key={map} value={map}>{map}</option>
                        )
                    })}
                </select>
                <label>Description</label>
                <input type="text" name="description" value={lineup.description} onChange={handleChange}/>
                <label>Video url</label>
                <input type="text" name="video" value={lineup.video} onChange={handleChange}/>
                <button type="submit">Submit changes</button>
            </form>
        </div>
    )
};