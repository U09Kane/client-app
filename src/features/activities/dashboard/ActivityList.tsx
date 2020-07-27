import React, { useState, useEffect } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';

import { Activity } from '../../../app/models';

interface Props {
  activities: Activity[];
  setActivity: (id: string) => void;
  didDelete: (id: string) => void;
  isSubmitting?: boolean;
}

const ActivityList: React.FC<Props> = ({
  activities,
  setActivity,
  isSubmitting,
  didDelete,
}) => {
  const [deleteID, setDeleteID] = useState<string | null>(null);

  const onDelete = (activity: Activity) => {
    setDeleteID(activity.id);
    didDelete(activity.id);
  };

  useEffect(() => {
    if (!isSubmitting) {
      setDeleteID(null);
    }
  }, [isSubmitting]);
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
                <Button
                  onClick={() => onDelete(activity)}
                  loading={activity.id === deleteID}
                  floated="right"
                  content="Delete"
                  color="red"
                />
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      ))}
    </Segment>
  );
};

export default ActivityList;
