import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:5000/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

export { request };
