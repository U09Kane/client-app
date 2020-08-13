import React, { useState, useEffect, useContext } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { Activity } from '../../../app/types';
import ActivityStore from '../../../store/activity.store';

const ActivityList: React.FC = () => {
  const [deleteID, setDeleteID] = useState<string | null>(null);
  const { activitesByDate, isSubmitting, deleteActivity } = useContext(
    ActivityStore
  );

  const onDelete = (activity: Activity) => {
    setDeleteID(activity.id);
    deleteActivity(activity.id);
  };

  useEffect(() => {
    if (!isSubmitting) {
      setDeleteID(null);
    }
  }, [isSubmitting]);
  return (
    <Segment clearing>
      {activitesByDate.map(activity => (
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
                  as={Link}
                  to={`/activities/${activity.id}`}
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

export default observer(ActivityList);
