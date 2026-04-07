import axios from "axios"; 

const local = 'http://localhost:3001/'

const instance = axios.create({
  baseURL : local,
});

export default instance;