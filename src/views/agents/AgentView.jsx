import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { IoMdArrowRoundBack } from 'react-icons/io';
import ErrorPage from '../ErrorPage';

export default function AgentView() {

    const { agentId } = useParams();
    const [agent, setAgent] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const getAgent = async () => {
        try {
            const response = await axios.get(`https://valorant-api.com/v1/agents/${agentId}`)
            setAgent(response.data.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
            setError(true);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getAgent()
        // eslint-disable-next-line
    }, [agentId]);
    
    
    return (
        <div>
        <button className="goback-btn" onClick={() => navigate(-1) }><IoMdArrowRoundBack size={30} color='white'/></button>
        <div className='agents-general'>
        {isLoading && <Loading />}
        {error && <ErrorPage />}
        {agent && <div className='agent-detail' key={agent.uuid}>
        <div className='agent-info'>
            <h3>{agent.displayName}</h3>
            <p className='agent-info-role'>{agent.role && agent.role.displayName}</p>
            <audio
                controls
                src={agent.voiceLine && agent.voiceLine.mediaList.map(elem => {
                    return elem.wave
                })}
                >
                Your browser does not support the
                <code>audio</code> element.
            </audio>
            <img src={agent.bustPortrait} alt={agent.displayName} />
            <p className='agent-description'>{agent.description}</p>
            </div>
            <div className='agent-abilities'>
                {agent.abilities && agent.abilities.map((abilitie) => {
                    return (
                        <div key={abilitie.slot} className='abilitie'>
                            <h4>{abilitie.slot}</h4>
                            <h4>{abilitie.displayName}</h4>
                            <img src={abilitie.displayIcon} alt={abilitie.displayName} />
                        </div>
                    )
                })}
            </div>
        </div>}
        </div>
        </div>
    
    )
}