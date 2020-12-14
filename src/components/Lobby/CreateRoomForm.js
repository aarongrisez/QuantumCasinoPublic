import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Container,
  Row,
  Col
} from 'reactstrap';
import { Field, reduxForm } from 'redux-form';

const renderInputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <Label>{label}</Label>
    <div>
      <Input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const required = value =>
  value || typeof value === 'number' ? undefined : 'Required';

let CreateRoomForm = props => {
  const { handleSubmit, pristine, reset, submitting, onSubmit } = props;

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Row xs="3">
            <Col xs="6">
              <Field
                type="text"
                label="Room Name"
                component={renderInputField}
                name="roomName"
                validate={[required]}
              />
            </Col>
          </Row>
        </FormGroup>
        <Button type="submit" disabled={submitting}>
          Submit
        </Button>
        <Button type="button" disabled={pristine || submitting} onClick={reset}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
};
CreateRoomForm = reduxForm({
  form: 'create-room-form'
})(CreateRoomForm);

export default CreateRoomForm;
