import React from 'react';
import { Grid } from 'semantic-ui-react';

import Activity from '../../../app/layout/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';

interface Props {
  activities: Activity[];
}

const activityDashboard: React.FC<Props> = ({ activities }) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityDetails />
      </Grid.Column>
    </Grid>
  );
};

export default activityDashboard;
