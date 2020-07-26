import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';

import { Activity } from '../../../app/models';
import img from '../../../assets/categories/drinks.jpg';

interface Props {
  activity: Activity;
  setEdit: (mode: boolean) => void;
  clearActivity: () => void;
}

const activityDetails: React.FC<Props> = ({
  activity,
  setEdit,
  clearActivity,
}) => {
  return (
    <Card fluid>
      <Image src={img} ui={false} wrapped />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEdit(true)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => clearActivity()}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default activityDetails;
