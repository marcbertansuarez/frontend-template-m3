import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading';

export default function AgentView() {

    const { agentId } = useParams();
    const [agent, setAgent] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getAgent = async () => {
        try {
            const response = await axios.get(`https://valorant-api.com/v1/agents/${agentId}`)
            setAgent(response.data.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAgent()
        // eslint-disable-next-line
    }, [agentId]);
    console.log(agent.uuid)
    
    return (
        <div>
        {isLoading && <Loading />}
        {agent && <div key={agent.uuid}>
        <div>
            <h3>{agent.displayName}</h3>
            <p>{agent.role && agent.role.displayName}</p>
            <audio
                controls
                src={agent.voiceLine && agent.voiceLine.mediaList.map(elem => {
                    return elem.wave
                })}
                >
                Your browser does not support the
                <code>audio</code> element.
            </audio>
            <img style={{width: "250px"}} src={agent.bustPortrait} alt={agent.displayName} />
            <p>{agent.description}</p>
            <div>
                {agent.abilities && agent.abilities.map((abilitie) => {
                    return (
                        <>
                            <h4>{abilitie.slot}</h4>
                            <h4>{abilitie.displayName}</h4>
                            <p>{abilitie.description}</p>
                            <img src={abilitie.displayIcon} alt={abilitie.displayName} />
                        </>
                    )
                })}
            </div>
        </div>
        </div>}
        </div>
    
    )
}