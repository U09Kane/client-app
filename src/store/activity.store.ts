import { createContext } from 'react';
import { observable, action, computed } from 'mobx';
import { v4 as uuid } from 'uuid';

import { Activity } from '../app/models';
import api from '../axios';

class ActivityStore {
  @observable activities: Activity[] = [];

  @observable selected: Activity | undefined;

  @observable isEditing = false;

  @observable isSubmitting = false;

  @action
  getActivites = async () => {
    try {
      const activities = await api.activity.getAll();
      const truncated = activities.map(d => ({
        ...d,
        date: d.date.split('.')[0],
      }));
      this.activities = truncated;
    } catch (err) {
      console.error(err);
    }
  };

  @action
  selectActivity = (id: string) => {
    this.selected = this.activities.find(d => d.id === id);
    this.isEditing = false;
  };

  @action
  createActivity = async (activity: Activity) => {
    this.isSubmitting = true;
    if (activity.id !== '') {
      await api.activity.update(activity);
      this.activities = this.activities.map(d =>
        d.id === activity.id ? activity : d
      );
      this.selected = activity;
    } else {
      const updated = { ...activity, id: uuid() };
      await api.activity.create(updated);
      this.activities.push(updated);
      this.selected = updated;
    }
    this.isEditing = false;
    this.isSubmitting = false;
  };

  @action
  openCreateActivityForm = () => {
    this.selected = undefined;
    this.isEditing = true;
  };

  @computed get activitesByDate() {
    console.log('hello');
    return this.activities.sort(
      (l, r) => Date.parse(l.date) - Date.parse(r.date)
    );
  };
}

export default createContext(new ActivityStore());
