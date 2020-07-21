import React from 'react';
import { Grid, Item } from 'semantic-ui-react';

import Activity from '../../../app/layout/models/activity';

interface Props {
  activities: Activity[];
}

const activityDashboard: React.FC<Props> = ({ activities }) => {
  const activityItems = activities.map((d) => <Item>{d.title}</Item>);
  return (
    <Grid>
      <Grid.Column width="10">{activityItems}</Grid.Column>
    </Grid>
  );
};

export default activityDashboard;
