import React, { useContext, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Card, Button, Image } from 'semantic-ui-react';

import ActivityStore from '../../../store/activity.store';
import img from '../../../assets/categories/drinks.jpg';

interface RouteProps {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<RouteProps>> = ({
  match,
  history,
}) => {
  const {
    selected: activity,
    clearSelected,
    setEditMode,
    getActivityByID,
  } = useContext(ActivityStore);
  useEffect(() => {
    getActivityByID(match.params.id);
  }, [getActivityByID, match.params.id]);
  return (
    <Card fluid>
      <Image src={img} ui={false} wrapped />
      <Card.Content>
        <Card.Header>{activity?.title}</Card.Header>
        <Card.Meta>
          <span>{activity?.date}</span>
        </Card.Meta>
        <Card.Description>{activity?.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            as={Link}
            to={`/manage/${activity?.id}`}
            onClick={() => setEditMode(true)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push('/activities')}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(ActivityDetails);
