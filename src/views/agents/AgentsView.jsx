import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { IoMdArrowRoundBack } from 'react-icons/io';
import ErrorPage from '../ErrorPage';

export default function AgentsView() {

    const [agents, setAgents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const getAgents = async () => {
        try {
            const response = await axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true')
            setAgents(response.data.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setError(true);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAgents()
    }, []);

    
    return (
        <div>
        <button className="goback-btn" onClick={() => navigate(-1) }><IoMdArrowRoundBack size={30} color='white'/></button>
        <div className='agents-general'>
        {isLoading && <Loading />}
        {error && <ErrorPage />}
        <h1>Agents</h1>
        <div className='agents'>
        
        {agents && agents.map(agent => {
            return (
                <div className='agent' key={agent.uuid}>
                    <Link to={`/agents/${agent.uuid}`}>
                    <img src={agent.displayIconSmall} alt={agent.displayName} />
                    <h4>{agent.displayName}</h4>
                    </Link>
                </div>
            )
        })}
        </div>
        </div>
        </div>
    
    )
}