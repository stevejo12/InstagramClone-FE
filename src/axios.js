import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8002/'
  // baseURL: 'https://instagramclone--project.herokuapp.com/'
})

export default instance;