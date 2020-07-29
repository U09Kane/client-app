import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Dimmer, Loader } from 'semantic-ui-react';

import './App.css';
import Navbar from '../../features/nav/Navbar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDasboard';

import ActivityStore from '../../store/activity.store';

const App: React.FC = () => {
  const activityStore = useContext(ActivityStore);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    activityStore.getActivites();
    setLoading(false);
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
        <ActivityDashboard />
      </Container>
    </div>
  );
};

export default observer(App);
