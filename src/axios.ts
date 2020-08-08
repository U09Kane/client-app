import axios, { AxiosResponse } from 'axios';
import { Activity } from './app/types';
import { assertPropertyConfigurable } from 'mobx/lib/internal';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

function getActivites(): Promise<Activity[]> {
  return api.get('/activities').then(({ data }) => data);
}

function getActivity(id: string): Promise<Activity> {
  return api.get(`/activities/${id}`).then(({ data }) => data);
}

function createActivity(activity: Activity): Promise<AxiosResponse> {
  return api.post('/activities', activity);
}

function updateActivity(activity: Activity): Promise<AxiosResponse> {
  return api.put(`/activities/${activity.id}`, activity);
}

function deleteActivity(id: string): Promise<AxiosResponse> {
  return api.delete(`/activities/${id}`);
}

export default {
  activity: {
    getOne: getActivity,
    getAll: getActivites,
    create: createActivity,
    update: updateActivity,
    delete: deleteActivity,
  },
};
