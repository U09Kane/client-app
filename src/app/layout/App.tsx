import React, { useState, useEffect } from 'react';
import { Header, Icon, List, Divider } from 'semantic-ui-react';

import './App.css';
import api from '../../axios';
import Activity from './models/activity';

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
      <Header as="h2">
        <Icon name="users" />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
        {activities.map((activity) => (
          <div>{activity.title}</div>
        ))}
      </List>
    </div>
  );
};

export default App;
