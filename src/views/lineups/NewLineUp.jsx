import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lineupService from '../../services/lineupService';

export default function NewLineUp() {

    const initalState = {
        title: '',
        agent: '',
        map: '',
        description: '',
        video: '' 
    }

    const [newLineup, setNewLineup] = useState(initalState);

    const agents = ['Astra', 'Breach', 'Brimstone', 'Chamber', 'Cypher', 'Fade', 'Guekko', 'Harbor', 'Jett', 'KAY/O', 'Killjoy', 'Neon', 'Omen', 'Phoenix', 'Raze', 'Reyna', 'Sage', 'Skye', 'Sova', 'Viper', 'Yoru'];
    const maps = ['Bind', 'Haven', 'Split', 'Ascent', 'Icebox', 'Breeze', 'Fracture', 'Pearl', 'Lotus']

    const navigate = useNavigate();


    const handleChange = (e) => {
        setNewLineup(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const createdLineup = await lineupService.createLineUp(newLineup)
            navigate(`/lineup/${createdLineup._id}`)
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div>
            <h2>Create new LineUp</h2>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type="text" name="title" value={newLineup.title} onChange={handleChange}/>
                <label>Agent</label>
                <select name="agent" onChange={handleChange} value={newLineup.agent} >
                {agents.map(agent => {
                    return (
                        <option key={agent} value={agent}>{agent}</option>
                    )
                })}
                </select>
                <label>Map</label>
                <select name="map" onChange={handleChange} value={newLineup.map}>
                    {maps.map(map => {
                        return (
                            <option key={map} value={map}>{map}</option>
                        )
                    })}
                </select>
                <label>Description</label>
                <input type="text" name="description" value={newLineup.description} onChange={handleChange}/>
                <label>Video url</label>
                <input type="text" name="video" value={newLineup.video} onChange={handleChange}/>
                <button type="submit">Create lineup</button>
            </form>
        </div>
    )
};