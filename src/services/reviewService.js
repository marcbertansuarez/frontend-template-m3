import axios from "axios";

class ReviewService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/review`,
    });
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  createReview(lineupId, body) {
    return this.api
      .post(`/${lineupId}`, body)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

  editReview(id, body) {
    return this.api
      .put(`/${id}`, { content: body })
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

  deleteReview(id) {
    return this.api
      .delete(`/${id}`)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }
}

const reviewService = new ReviewService();

export default reviewService;
