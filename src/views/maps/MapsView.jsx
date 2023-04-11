import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading';

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
        <div className='maps-view'>
        {isLoading && <Loading />}
        <h1>Maps</h1>
        <div className='maps'>
        {maps && maps.map(elem => {
            return (
                <div className='map' key={elem.uuid}>
                <Link to={`/maps/${elem.uuid}`}>
                    <h4>{elem.displayName}</h4>
                    <img src={elem.splash} alt={elem.displayName} />
                    </Link>
                </div>
            )
        })}
        </div>
        </div>
    )
}