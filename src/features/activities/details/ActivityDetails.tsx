import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';

import Activity from '../../../app/models/activity';

interface Props {
  activity: Activity;
}

const activityDetails: React.FC<Props> = ({ activity }) => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categories${activity.category}`}
        ui={false}
        wrapped
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button basic color="blue" content="Edit" />
          <Button basic color="blue" content="Edit" />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default activityDetails;
