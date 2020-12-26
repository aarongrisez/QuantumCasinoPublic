import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Card, CardBody } from 'reactstrap';
import { useAuth0 } from '@auth0/auth0-react';

const JOINED = "Already Joined";
const JOINABLE = "Join";
const NOT_JOINABLE = "Not Joinable"

const Room = props => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth0();

  const toggle = () => setIsOpen(!isOpen);

  const getJoinState = (username, playerNames, maxPlayers) => {
    if (playerNames.includes(username)) {
      return JOINED
    }
    else if (playerNames.length < maxPlayers) {
      return JOINABLE
    }
    else {
      return NOT_JOINABLE
    }
  }

  const joinState = getJoinState(
    user.nickname,
    props.players.map((player) => player.username),
    props.maxPlayers
  )

  return (
    <Fragment>
      <tr>
        <td>{props.roomName}</td>
        <td>{props.game}</td>
        <td>{props.players.length} / {props.maxPlayers}</td>
        <td>
          <Button onClick={toggle}>Details</Button>
        </td>
        <td>
          <Button disabled={!(joinState === JOINABLE)}>
            {joinState}
          </Button>
        </td>
      </tr>
      <Modal isOpen={isOpen} toggle={toggle}>
        <Card>
          <CardBody>
            {props.players.map((player, index) => (
              <User key={index} username={player.username}/>
            ))}
          </CardBody>
        </Card>
      </Modal>
    </Fragment>
  );
};

const User = props => {

  return (
    <li>
      {props.username}
    </li>
  )
}

Room.propTypes = {
  roomName: PropTypes.string.isRequired,
  game: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  maxPlayers: PropTypes.number.isRequired,
};

export default Room;
