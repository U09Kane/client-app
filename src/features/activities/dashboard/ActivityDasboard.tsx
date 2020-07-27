import React from 'react';
import { Grid } from 'semantic-ui-react';

import { Activity } from '../../../app/models';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivtyForm from '../form/ActivityForm';

interface Props {
  activities: Activity[];
  selectedActivity: Activity | null;
  editMode: boolean;
  setActivity: (id: string | null) => void;
  setEditMode: (mode: boolean) => void;
  didSubmitCreate: (d: Activity) => void;
  isSubmitting: boolean;
}

const activityDashboard: React.FC<Props> = ({
  activities,
  setActivity,
  editMode,
  setEditMode,
  selectedActivity = null,
  didSubmitCreate,
}) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities} setActivity={setActivity} />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            setEdit={setEditMode}
            clearActivity={() => setActivity(null)}
          />
        )}
        {editMode && (
          <ActivtyForm
            key={selectedActivity ? selectedActivity.id : '0'}
            selectedActivity={selectedActivity}
            setEditMode={setEditMode}
            didSubmitCreate={didSubmitCreate}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default activityDashboard;
