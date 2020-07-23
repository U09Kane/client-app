import React from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';

import Activity from '../../../app/models/activity';

interface Props {
  activities: Activity[];
  setActivity: (id: string) => void;
}

const activityList: React.FC<Props> = ({ activities, setActivity }) => {
  return (
    <Segment clearing>
      {activities.map(activity => (
        <Item.Group divided style={{ textAlign: 'left' }} key={activity.id}>
          <Item>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.venue}</div>
              </Item.Description>
              <Item.Extra>
                <Label basic content={activity.category} />
                <Button
                  onClick={() => setActivity(activity.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      ))}
    </Segment>
  );
};

export default activityList;
