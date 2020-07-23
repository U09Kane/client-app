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
              <Item.Header as="a">Title</Item.Header>
              <Item.Meta>02-28-1996</Item.Meta>
              <Item.Description>
                <div>A very descriptive description of a thing</div>
                <div>City, Venue</div>
              </Item.Description>
              <Item.Extra>
                <Label basic content="Category" />
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
