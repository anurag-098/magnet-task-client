import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${sessionStorage.getItem("authToken")}`,
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('llll',token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const postRequest = async (endpoint, data) => {
  return api
    .post(endpoint, data)
    .then((response) => response)
    .catch((error) => {
      console.error("Error making POST request:", error);

      if (error.response && error.response.status === 401) {
        sessionStorage.removeItem("authToken");
      }

      throw error; 
    });
};

export const getRequest = async (endpoint) => {
  return await api
    .get(endpoint)
    .then((response) => response)
    .catch((error) => {
      console.error("Error making POST request:", error);

      if (error.response && error.response.status === 401) {
        sessionStorage.removeItem("token");
      }

      throw error; 
    });
};

export default api;
