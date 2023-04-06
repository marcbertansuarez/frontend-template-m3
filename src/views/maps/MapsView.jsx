import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function MapsView() {

    const [maps, setMaps] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getMaps = async () => {
        try {
            const response = await axios.get('https://valorant-api.com/v1/maps')
            setMaps(response.data.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMaps()
    }, []);

    
    return (
        <div>
        {isLoading && <div>LOADING...</div>}
        {maps && maps.map(elem => {
            return (
                <div key={elem.uuid}>
                <Link to={`/maps/${elem.uuid}`}>
                    <h4>{elem.displayName}</h4>
                    <img style={{width: "200px"}} src={elem.splash} alt={elem.displayName} />
                    </Link>
                </div>
            )
        })}
        </div>
    )
}