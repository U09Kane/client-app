import React from 'react';
import { Grid } from 'semantic-ui-react';

import Activity from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivtyForm from '../form/ActivityForm';

interface Props {
  activities: Activity[];
  selectedActivity: Activity | null;
  setActivity: (id: string) => void;
}

const activityDashboard: React.FC<Props> = ({
  activities,
  setActivity,
  selectedActivity = null,
}) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} setActivity={setActivity} />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && <ActivityDetails activity={selectedActivity} />}
        <ActivtyForm />
      </Grid.Column>
    </Grid>
  );
};

export default activityDashboard;
