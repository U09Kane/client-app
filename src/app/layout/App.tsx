import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';

import './App.css';
import api from '../../axios';
import { Activity } from '../models';
import Navbar from '../../features/nav/Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDasboard';

import ActivityStore from '../../store/activity.store';

const App: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selected, setSelected] = useState<Activity | null>(null);
  const [isEditing, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);

  const didSelectActivity = (id: string | null) => {
    if (id === null) {
      setSelected(null);
    } else {
      setSelected(activities.filter(d => d.id === id)[0]);
    }
    setEdit(false);
  };

  const didDeleteActivity = (id: string) => {
    setSubmitting(true);
    api.activity.delete(id).then(() => {
      setSubmitting(false);
      setActivities(arr => arr.filter(d => d.id !== id));
      setSelected(null);
    });
  };

  const didCreateActivity = async (activity: Activity) => {
    setSubmitting(true);
    if (activity.id !== '') {
      await api.activity.update(activity);
      setActivities(curr =>
        curr.map(d => (d.id === activity.id ? activity : d))
      );
      setSelected(activity);
    } else {
      const updated = { ...activity, id: uuid() };
      await api.activity.create(updated);
      setActivities(cur => [...cur, updated]);
      setSelected(updated);
    }
    setEdit(false);
    await setSubmitting(false);
  };

  useEffect(() => {
    activityStore.getActivites();
    api.activity
      .getAll()
      .then(data => {
        const truncated = data.map(d => ({ ...d, date: d.date.split('.')[0] }));
        setActivities(truncated);
      })
      .then(() => setLoading(false))
      .catch(() => {});
  }, [activityStore]);

  if (loading)
    return (
      <Dimmer active inverted>
        <Loader content="Loading Activities..." />
      </Dimmer>
    );
  return (
    <div className="App">
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          setActivity={didSelectActivity}
          setEditMode={setEdit}
          isSubmitting={isSubmitting}
          didDelete={didDeleteActivity}
        />
      </Container>
    </div>
  );
};

export default observer(App);
