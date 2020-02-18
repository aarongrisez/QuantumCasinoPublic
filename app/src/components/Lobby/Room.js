import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse, Card, CardBody } from 'reactstrap';

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
      </tr>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody>Here are some details about game {props.roomName}</CardBody>
        </Card>
      </Collapse>
    </Fragment>
  );
};

Room.propTypes = {
  roomName: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  numPlayers: PropTypes.number.isRequired
};

export default Room;
