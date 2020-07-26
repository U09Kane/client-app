import React, { useState, useEffect } from 'react';
import { Container, Dimmer, Loader } from 'semantic-ui-react';

import './App.css';
import api from '../../axios';
import { Activity } from '../models';
import Navbar from '../../features/nav/Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDasboard';

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selected, setSelected] = useState<Activity | null>(null);
  const [isEditing, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const didSelectActivity = (id: string | null) => {
    if (id === null) {
      setSelected(null);
    } else {
      setSelected(activities.filter(d => d.id === id)[0]);
    }
    setEdit(false);
  };

  const didEditNewActivity = () => {
    setSelected(null);
    setEdit(true);
  };

  useEffect(() => {
    api.activity
      .getAll()
      .then(data => {
        const truncated = data.map(d => ({ ...d, date: d.date.split('.')[0] }));
        setActivities(truncated);
      })
      .then(() => setLoading(false))
      .catch(() => {});
  }, []);

  if (loading)
    return (
      <Dimmer active inverted>
        <Loader content="Loading Activities..." />
      </Dimmer>
    );
  return (
    <div className="App">
      <Navbar openCreateActivity={didEditNewActivity} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          setActivity={didSelectActivity}
          selectedActivity={selected}
          editMode={isEditing}
          setEditMode={setEdit}
        />
      </Container>
    </div>
  );
};

export default App;
