import axios from 'axios';

class LineUpService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/lineup`
    });
}
//     this.api.interceptors.request.use(config => {
//       const storedToken = localStorage.getItem('authToken');
//       if (storedToken) {
//         config.headers = { Authorization: `Bearer ${storedToken}` };
//       }
//       return config;
//     });
//   }

getLineUps() {
    this.api.get('/').then(({ data }) => data).catch(err => console.error(err));
}

getLineUp(id) {
    this.api.get(`/${id}`).then(({ data }) => data).catch(err => console.error(err));
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