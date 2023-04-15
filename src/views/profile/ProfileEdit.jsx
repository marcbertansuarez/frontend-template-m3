import React, { useState, useEffect } from 'react';
import profileService from '../../services/profileService';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import { IoMdArrowRoundBack } from 'react-icons/io';

export default function ProfileEdit() {
    

    const [profile, setProfile] = useState({
        username: '',
        image: ''
    })
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

    const handleImage = (e) => {
        if (e.target.files[0]) {
          setProfile((prev) => {
            return {
              ...prev,
              image: e.target.files[0]
            };
          });
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('username', profile.username);
        if (profile.image) {
        formData.append('image', profile.image);
    }
        try {
            await profileService.editProfile(formData)
            navigate('/profile');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='general-form-edit'>
        <button className="goback-btn" onClick={() => navigate(-1) }><IoMdArrowRoundBack size={30} color='white'/></button>
        <div className='form-edit'>
        {isLoading && <Loading />}
            <h2>Editing {profile.username}</h2>
            <form className='form-edit-form' onSubmit={handleSubmit} encType="multipart/form-data">
                <label>Update username</label>
                <input type="text" name="username" value={profile.username} onChange={handleChange}/>
                <label>Update image</label>
                <input type="file" name="image" onChange={handleImage} accept="image/*"/>
                <button type="submit">Edit profile</button>
            </form>
        </div>
        </div>
    )
}