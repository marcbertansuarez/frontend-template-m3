import axios from 'axios';

class LineUpService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/lineup`
    });
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });   
}


getLineUps() {
    return this.api.get('/').then(({ data }) => data).catch(err => console.error(err));
}

getLineUp(id) {
    return this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err));
}

createLineUp(body) {
    return this.api.post('/', body).then(({ data }) => data).catch(err => console.error(err));
  }

editLineUp(id, body) {
    return this.api.put(`/${id}`, body).then(({ data }) => data).catch(err => console.error(err));
}

deleteLineUp(id) {
  
    return this.api.delete(`/${id}`).then(({ data }) => data).catch(err => console.error(err));
}
  
}

const lineupService = new LineUpService();

export default lineupService;