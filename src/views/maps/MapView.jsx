import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

export default function MapView() {

    const { mapId } = useParams()
    const [map, setMap] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getMap = async () => {
        try {
            const response = await axios.get(`https://valorant-api.com/v1/maps/${mapId}`)
            setMap(response.data.data)
            console.log(response.data.data)
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
        {isLoading && <div>LOADING...</div>}
        {map && <div>
            <h3>{map.displayName}</h3>
            <img src={map.listViewIcon} alt={map.displayName} />
            <img src={map.displayIcon} alt={map.displayName} />  
        </div>}
        </div>
    )
}