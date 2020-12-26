import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

import Loading from '../components/Layout/Loading';
import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
  const { loading, user, getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const [userToken, setUserToken] = useState("");
  const [IdTokenClaims, setIdTokenClaims] = useState("");

  useEffect(() => {
    getAccessTokenSilently({
      audience: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/`,
      scope: "openid profile email read:current_user update:current_user_metadata"
    }).then(result => {
      setUserToken(result);
    });
    getIdTokenClaims().then(result => {
      setIdTokenClaims(result)
    })
  }, [getAccessTokenSilently, getIdTokenClaims])

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.nickname}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
