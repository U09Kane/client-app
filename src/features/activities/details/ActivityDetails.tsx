import React from 'react';
import { Card, Button, Image } from 'semantic-ui-react';

import placeholderIcon from '../../../assets/placeholder.png';

const activityDetails: React.FC = () => (
  <Card fluid>
    <Image src={placeholderIcon} wrapped ui={false} />
    <Card.Content>
      <Card.Header>Title</Card.Header>
      <Card.Meta>
        <span>Date</span>
      </Card.Meta>
      <Card.Description>Description of Activity</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
        <Button basic color="blue" content="Edit" />
        <Button basic color="blue" content="Edit" />
      </Button.Group>
    </Card.Content>
  </Card>
);

export default activityDetails;
