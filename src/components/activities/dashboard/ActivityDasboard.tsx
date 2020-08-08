import React from 'react';
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';

import ActivityStore from '../../../store/activity.store';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivtyForm from '../form/ActivityForm';

const ActivityDashboard: React.FC = () => {
  const {
    isEditing,
    selected,
    createActivity,
    setEditMode,
    clearSelected,
  } = React.useContext(ActivityStore);
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        <h2>Placeholder</h2>
        {/* {selected && !isEditing && <ActivityDetails />}
        {isEditing && (
          <ActivtyForm
            key={selected ? selected.id : '0'}
            setEditMode={() => setEditMode(false)}
            didSubmitCreate={createActivity}
          />
        )} */}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
