import React, { useState, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { Activity } from '../../../app/models';

interface Props {
  setEditMode: (mode: boolean) => void;
  didSubmitCreate: (d: Activity) => void;
  selectedActivity: Activity | null;
  isSubmitting?: boolean;
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

const ActivityForm: React.FC<Props> = ({
  setEditMode,
  didSubmitCreate,
  selectedActivity,
  isSubmitting,
}) => {
  const [activity, setActivity] = useState<Activity>(
    selectedActivity || initial
  );
  const didChange = ({
    currentTarget: { name, value },
  }: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setActivity(d => ({ ...d, [name]: value }));
  };

  return (
    <Segment clearing>
      <Form onSubmit={() => didSubmitCreate(activity)}>
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
          onClick={() => setEditMode(false)}
          floated="right"
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
