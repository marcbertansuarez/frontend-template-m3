import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    email: ''
  })
  const [password, setPassword] = useState('');
  const [passwordControl, setPasswordControl] = useState('');
  const [image, setImage] = useState('')
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleImage = async (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (password !== passwordControl) {
      setErrorMessage("Passwords don't match")
    } else {
      setErrorMessage(undefined)
    }
  }, [passwordControl, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('password', password);
    if (image) {
      formData.append('image', image);
    }
    try {
      await authService.signup(formData);
      navigate('/login');
    } catch (error) {
      console.error(error)
      setErrorMessage('Unable to create user account')
    }
  }

  return (
    <div className='new-lineup'>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Username</label>
        <input required type="text" name="username" value={user.username} onChange={handleChange} placeholder="username123"/>
        <label>Email</label>
        <input required type="email" name="email" value={user.email} onChange={handleChange} placeholder="user@gmail.com"/>
        <label>Password</label>
        <input required type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********"/>
        <label>Repeat password</label>
        <input required type="password" name="passwordControl" value={passwordControl} onChange={(e) => setPasswordControl(e.target.value)} placeholder="********"/>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <label>Profile Picture</label>
        <input type="file" name="image" onChange={handleImage} accept="image/*" />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
