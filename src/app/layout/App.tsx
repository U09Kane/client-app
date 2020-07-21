import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';

import './App.css';
import api from '../../axios';
import Activity from './models/activity';
import Navbar from '../../features/nav/Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDasboard';

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    api
      .get<Activity[]>('/activities')
      .then(({ data }) => setActivities(data))
      .catch(() => {});
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard activities={activities} />
      </Container>
    </div>
  );
};

export default App;
