import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';

import './App.css';
import api from '../../axios';
import Activity from '../models/activity';
import Navbar from '../../features/nav/Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDasboard';

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selected, setSelected] = useState<Activity | null>(null);

  const [isEditing, setEdit] = useState(false);

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
    api
      .get<Activity[]>('/activities')
      .then(({ data }) => setActivities(data))
      .catch(() => {});
  }, []);

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
