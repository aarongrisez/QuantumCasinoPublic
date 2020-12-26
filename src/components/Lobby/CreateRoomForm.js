import React from 'react';
import {
  Button,
  Form,
  Container
} from 'reactstrap';
import { reduxForm } from 'redux-form';

let CreateRoomForm = props => {
  const { handleSubmit, canRequestRoom, onSubmit } = props;

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Button type="submit" disabled={!canRequestRoom}>
          Make a new room!
        </Button>
     </Form>
    </Container>
  );
};
CreateRoomForm = reduxForm({
  form: 'create-room-form'
})(CreateRoomForm);

export default CreateRoomForm;
