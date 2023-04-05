import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from "../../context/AuthContext";
import profileService from '../../services/profileService';
import { useNavigate } from 'react-router-dom';
export default function ProfileEdit() {
    const { user } = useContext(AuthContext);
    console.log(user)
    const [profile, setProfile] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const getProfile = async () => {
        try {
            const response = await profileService.getProfile()
            setProfile(response.user)
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProfile()
    }, []);

    const handleChange = (e) => {
        setProfile(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await profileService.editProfile(profile)
            navigate('/profile');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        {isLoading && <div>LOADING...</div>}
        <div>
            <h2>Editing {profile.username}</h2>
            <form onSubmit={handleSubmit}>
                <label>Update username</label>
                <input type="text" name="username" value={profile.username} onChange={handleChange}/>
                <label>Update image</label>
                <input type="text" name="image" value={profile.image} onChange={handleChange}/>
                <button type="submit">Edit profile</button>
            </form>
        </div>
        </>
    )
}