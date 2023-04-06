import axios from 'axios';

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/auth`
    });

    this.api.interceptors.request.use(config => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  signup(formData) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return this.api.post('/signup', formData, config).then(({ data }) => data);
  }

  login(user) {
    return this.api.post('/login', user).then(({ data }) => data);
  }

  me() {
    return this.api.get('/me').then((response) => response.data);
  }
}

const authService = new AuthService();

export default authService;
