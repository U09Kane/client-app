import React, { useState, FormEvent, useEffect } from 'react';
import { BrowserRouterProps, RouteComponentProps } from 'react-router-dom';
import { Segment, Form, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

import { Activity } from '../../../app/types';
import ActivityStore from '../../../store/activity.store';

interface RouteProps {
  id: string;
}

const initial: Activity = {
  id: '',
  title: '',
  description: '',
  category: '',
  date: '',
  city: '',
  venue: '',
};

const ActivityForm: React.FC<RouteComponentProps<RouteProps>> = ({
  match: { params },
}) => {
  const {
    createActivity,
    selected,
    isSubmitting,
    getActivityByID,
  } = React.useContext(ActivityStore);
  const [activity, setActivity] = useState<Activity>(selected || initial);
  useEffect(() => {
    if (params.id) {
      getActivityByID(params.id).then(() =>
        selected ? setActivity(selected) : setActivity(initial)
      );
    } else {
      setActivity(initial);
    }
  }, [params.id, getActivityByID, selected]);
  const didChange = ({
    currentTarget: { name, value },
  }: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setActivity(d => ({ ...d, [name]: value }));
  };

  return (
    <Segment clearing>
      <Form onSubmit={() => createActivity(activity)}>
        <Form.Input
          value={activity.title}
          onChange={didChange}
          name="title"
          placeholder="Title"
        />
        <Form.TextArea
          value={activity.description}
          onChange={didChange}
          placeholder="Description"
          name="description"
          rows="2"
        />
        <Form.Input
          value={activity.category}
          onChange={didChange}
          name="category"
          placeholder="Category"
        />
        <Form.Input
          value={activity.date}
          onChange={didChange}
          name="date"
          placeholder="Date"
          type="datetime-local"
        />
        <Form.Input
          value={activity.city}
          onChange={didChange}
          name="city"
          placeholder="City"
        />
        <Form.Input
          onChange={didChange}
          value={activity.venue}
          name="venue"
          placeholder="Venue"
        />
        <Button
          loading={isSubmitting}
          floated="right"
          type="submit"
          content={activity.id === '' ? 'Create' : 'Update'}
          positive
        />
        <Button
          onClick={() => {}}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
