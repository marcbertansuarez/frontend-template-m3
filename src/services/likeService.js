import axios from 'axios';

class LikeService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/like`
    });
    this.api.interceptors.request.use((config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      });   
}

createLike(id) {
    return this.api.post(`/${id}`).then(({ data }) => data).catch(err => console.error(err));
}

  
}

const likeService = new LikeService();

export default likeService;