import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading';
import { IoMdArrowRoundBack } from 'react-icons/io';

export default function MapView() {

    const { mapId } = useParams()
    const [map, setMap] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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
        <button className="goback-btn" onClick={() => navigate(-1) }><IoMdArrowRoundBack size={30} color='white'/></button>
        <div className='map-details'>
        {isLoading && <Loading />}
        {map && <div className='map-details-info'>
            <h2>{map.displayName}</h2>
            <img className='map-details-picture' src={map.listViewIcon} alt={map.displayName} />
            <img className='map-details-map' src={map.displayIcon} alt={map.displayName} />  
        </div>}
        </div>
        </div>
    )
}