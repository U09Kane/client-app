import React from 'react';
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';

import ActivityStore from '../../../store/activity.store';
import { Activity } from '../../../app/models';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivtyForm from '../form/ActivityForm';

interface Props {
  isSubmitting: boolean;
  setActivity: (id: string | null) => void;
  setEditMode: (mode: boolean) => void;
  didDelete: (id: string) => void;
}

const ActivityDashboard: React.FC<Props> = ({
  setActivity,
  setEditMode,
  didDelete,
  isSubmitting,
}) => {
  const activityStore = React.useContext(ActivityStore);
  const { isEditing, selected, createActivity } = activityStore;
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList didDelete={didDelete} />
      </Grid.Column>
      <Grid.Column width="6">
        {selected && !isEditing && (
          <ActivityDetails
            setEdit={setEditMode}
            clearActivity={() => setActivity(null)}
          />
        )}
        {isEditing && (
          <ActivtyForm
            key={selected ? selected.id : '0'}
            setEditMode={setEditMode}
            didSubmitCreate={createActivity}
            isSubmitting={isSubmitting}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
