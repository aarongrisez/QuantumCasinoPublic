import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Card, CardBody } from 'reactstrap';

const Room = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Fragment>
      <tr>
        <td>{props.roomName}</td>
        <td>{props.game}</td>
        <td>{props.numPlayers}</td>
        <td>
          <Button onClick={toggle}>Details</Button>
        </td>
        <td>
          <Button>Join</Button>
        </td>
        <td>
          <Button onClick={props.requestDelete(props.roomName, props.game)}>
            Delete
          </Button>
        </td>
      </tr>
      <Modal isOpen={isOpen} toggle={toggle}>
        <Card>
          <CardBody>Here are some details about game {props.roomName}</CardBody>
        </Card>
      </Modal>
    </Fragment>
  );
};

Room.propTypes = {
  roomName: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  numPlayers: PropTypes.number.isRequired,
  requestDelete: PropTypes.func.isRequired
};

export default Room;
