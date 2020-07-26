import axios from 'axios';
import { Activity } from './app/models';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

function listActivites(): Promise<Activity[]> {
  return api.get('/activities').then(({ data }) => data);
}

export default {
  activity: {
    getAll: listActivites,
  },
};
