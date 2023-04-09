import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading';

export default function MapView() {

    const { mapId } = useParams()
    const [map, setMap] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getMap = async () => {
        try {
            const response = await axios.get(`https://valorant-api.com/v1/maps/${mapId}`)
            setMap(response.data.data)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMap()
        // eslint-disable-next-line
    }, [mapId]);

    
    return (
        <div>
        {isLoading && <Loading />}
        {map && <div>
            <h3>{map.displayName}</h3>
            <img src={map.listViewIcon} alt={map.displayName} />
            <img src={map.displayIcon} alt={map.displayName} />  
        </div>}
        </div>
    )
}