import { createContext } from 'react';
import { observable, action, computed } from 'mobx';
import { v4 as uuid } from 'uuid';

import { Activity } from '../app/models';
import api from '../axios';

class ActivityStore {
  @observable activitiesMap: Map<string, Activity> = new Map();
  // @observable activities: Activity[] = [];

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
      truncated.forEach(d => {
        this.activitiesMap.set(d.id, d);
      });
    } catch (err) {
      console.error(err);
    }
  };

  @action
  selectActivity = (id: string) => {
    this.selected = this.activitiesMap.get(id);
    this.isEditing = false;
  };

  @action
  setEditMode = (val: boolean) => {
    this.isEditing = val;
  };

  @action
  clearSelected = () => {
    this.selected = undefined;
    this.isEditing = false;
  };

  @action
  createActivity = async (activity: Activity) => {
    this.isSubmitting = true;
    if (activity.id !== '') {
      await api.activity.update(activity);
      this.activitiesMap.set(activity.id, activity);
      this.selected = activity;
    } else {
      const updated = { ...activity, id: uuid() };
      await api.activity.create(updated);
      this.activitiesMap.set(updated.id, updated);
      this.selected = updated;
    }
    this.isEditing = false;
    this.isSubmitting = false;
  };

  @action
  deleteActivity = async (id: string) => {
    this.isSubmitting = true;
    await api.activity.delete(id);
    if (this.selected && this.selected.id === id) {
      this.selected = undefined;
      this.setEditMode(false);
    }
    this.activitiesMap.delete(id);
    this.isSubmitting = false;
  };

  @action
  openCreateActivityForm = () => {
    this.selected = undefined;
    this.isEditing = true;
  };

  @computed
  get activitesByDate() {
    return Array.from(this.activitiesMap.values()).sort(
      (l, r) => Date.parse(l.date) - Date.parse(r.date)
    );
  }

  @computed
  get activities() {
    return this.activitiesMap.values();
  }
}

export default createContext(new ActivityStore());
