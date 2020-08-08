import { createContext } from 'react';
import { observable, action, computed, configure, runInAction } from 'mobx';
import { v4 as uuid } from 'uuid';

import { Activity } from '../app/types';
import api from '../axios';

configure({ enforceActions: 'always' });

class ActivityStore {
  @observable activitiesMap: Map<string, Activity> = new Map();

  @observable selected: Activity | undefined;

  @observable isEditing = false;

  @observable isSubmitting = false;

  @action
  getActivites = async () => {
    try {
      const activities = await api.activity.getAll();
      runInAction(() => {
        const truncated = activities.map(d => ({
          ...d,
          date: d.date.split('.')[0],
        }));
        truncated.forEach(d => {
          this.activitiesMap.set(d.id, d);
        });
      });
    } catch (err) {
      console.error(err);
    }
  };

  @action
  getActivityByID = async (id: string) => {
    let activity = this.activitiesMap.get(id);
    if (activity) {
      this.selected = activity;
    } else {
      try {
        activity = await api.activity.getOne(id);
        runInAction('retrieving activity', () => {
          this.selected = activity;
        });
      } catch (err) {
        console.error(err);
      }
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
      runInAction('update activity', () => {
        this.activitiesMap.set(activity.id, activity);
        this.selected = activity;
      });
    } else {
      const updated = { ...activity, id: uuid() };
      await api.activity.create(updated);
      runInAction('create activity', () => {
        this.activitiesMap.set(updated.id, updated);
        this.selected = updated;
      });
    }
    runInAction(() => {
      this.isEditing = false;
      this.isSubmitting = false;
    });
  };

  @action
  deleteActivity = async (id: string) => {
    this.isSubmitting = true;
    await api.activity.delete(id);
    runInAction('delete activity', () => {
      if (this.selected && this.selected.id === id) {
        this.selected = undefined;
        this.setEditMode(false);
      }
      this.activitiesMap.delete(id);
      this.isSubmitting = false;
    });
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
