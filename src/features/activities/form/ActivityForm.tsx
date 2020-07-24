import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import Activity from '../../../app/models/activity';
import { cursorTo } from 'readline';

interface Props {
  setEditMode: (mode: boolean) => void;
  selectedActivity: Activity | null;
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

const ActivityForm: React.FC<Props> = ({ setEditMode, selectedActivity }) => {
  const [activity, setActivity] = useState<Activity>(
    selectedActivity || initial
  );
  const didChange = ({
    currentTarget: { name, value },
  }: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setActivity(d => ({ ...d, [name]: value }));
  };

  const didSubmit = () => {};
  return (
    <Segment clearing>
      <Form>
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
          name="date"
          placeholder="Date"
          type="date"
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
        <Button floated="right" positive type="submit" content="Create" />
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
