import axios from "axios";

class ProfileService {
  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.REACT_APP_BACKEND_URL}/profile`,
    });
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  getProfile() {
    return this.api
      .get("/")
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

  getProfileLiked() {
    return this.api
      .get("/liked")
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

  getProfileUser(id) {
    return this.api
      .get(`${id}`)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }

  editProfile(formData) {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    return this.api
      .put(`/edit`, formData, config)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }
}
const profileService = new ProfileService();

export default profileService;
