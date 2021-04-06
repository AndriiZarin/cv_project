import axios from "axios";

const api = {
  CV: {
    fetchAll: () => axios.get("/api/cv").then((res) => res.data.cvs),
    fetchById: (id) => axios.get(`/api/cv/${id}`).then((res) => res.data.cv),
    create: (cv) => axios.post("/api/cv", { cv }).then((res) => res.data.cv),
    update: (cv) =>
      axios.put(`/api/cv/${cv._id}`, { cv }).then((res) => res.data.cv),
    delete: (cv) => axios.delete(`/api/cv/${cv._id}`),
  },
  users: {
    create: (user) => axios.post("/api/users", { user }),
    login: (credentials) =>
      axios.post("/api/auth", { credentials }).then((res) => res.data.token),
  },
};

export const setAuthorizationHeader = (token = null) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export default api;
