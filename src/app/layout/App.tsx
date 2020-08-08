import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Dimmer, Loader } from 'semantic-ui-react';
import { Route } from 'react-router-dom';

import './App.css';
import Navbar from '../../components/nav/Navbar';
import ActivityDashboard from '../../components/activities/dashboard/ActivityDasboard';

import ActivityStore from '../../store/activity.store';
import HomePage from '../../components/home/HomePage';
import ActivityForm from '../../components/activities/form/ActivityForm';
import ActivityDetails from '../../components/activities/details/ActivityDetails';

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
        <Route exact path="/" component={HomePage} />
        <Route exact path="/activities" component={ActivityDashboard} />
        <Route exact path="/activities/:id" component={ActivityDetails} />
        <Route
          exact
          path={['/create-activity', '/manage/:id']}
          component={ActivityForm}
        />
      </Container>
    </div>
  );
};

export default observer(App);
