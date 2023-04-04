import axios from 'axios';

class ProfileService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/profile`
    });
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });   
}


getProfile() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err));
  }


}
const profileService = new ProfileService();

export default profileService;