import axios from 'axios';
import { TuesdayApi } from '@tuesday/data-access';

const request = axios.create({
  baseURL: 'http://localhost:5000/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

const api = new TuesdayApi({ host: 'http://localhost:5000' });

export { request, api };
