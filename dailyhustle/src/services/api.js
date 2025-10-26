import axios from "axios";
const api = axios.create({
  baseURL:
    "https://daily-hustle-backend-ob8r9.sevalla.app/api/v1/", // update with your backend url , also i checked and this will actually be a gloabl url where tere  is "/" it will be used, by default!!!!!
  timeout: 10000,
});

export default api;
