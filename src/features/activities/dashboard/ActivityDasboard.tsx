import React from 'react';
import { Grid } from 'semantic-ui-react';

import Activity from '../../../app/models/activity';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivtyForm from '../form/ActivityForm';

interface Props {
  activities: Activity[];
  selectedActivity: Activity | null;
  editMode: boolean;
  setActivity: (id: string) => void;
  setEditMode: (mode: boolean) => void;
}

const activityDashboard: React.FC<Props> = ({
  activities,
  setActivity,
  editMode,
  setEditMode,
  selectedActivity = null,
}) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} setActivity={setActivity} />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails activity={selectedActivity} setEdit={setEditMode} />
        )}
        {editMode && <ActivtyForm />}
      </Grid.Column>
    </Grid>
  );
};

export default activityDashboard;
