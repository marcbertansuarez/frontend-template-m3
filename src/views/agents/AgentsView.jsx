import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';

export default function AgentsView() {

    const [agents, setAgents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getAgents = async () => {
        try {
            const response = await axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true')
            setAgents(response.data.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAgents()
    }, []);

    
    return (
        <div className='agents-general'>
        {isLoading && <Loading />}
        <h1>Agents</h1>
        <div className='agents'>
        
        {agents && agents.map(agent => {
            return (
                <div className='agent' key={agent.uuid}>
                    <Link to={`/agents/${agent.uuid}`}>
                    <img style={{width: "60px"}} src={agent.displayIconSmall} alt={agent.displayName} />
                    <h4>{agent.displayName}</h4>
                    </Link>
                </div>
            )
        })}
        </div>
        </div>
    
    )
}