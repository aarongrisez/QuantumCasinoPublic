/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import PrivateRoute from './private-route';

export const getPrivateLiNavLinks = (route_category, idx) => {
  return (
      <li key={idx}>
        <p>{route_category.name}</p>
        <ul>
          {route_category.routes.map((route, _idx) => (
            <PrivateLiNavLink
              key={`${idx}.${_idx}`}
              to={route.path}
              exact={true}
              activeClassName="active"
            >
              {route.text}
            </PrivateLiNavLink>
          ))}
        </ul>
      </li>
  )
}



const PrivateLiNavLink = props => {
  const {
    to,
    exact,
    strict,
    activeClassName,
    className,
    activeStyle,
    style,
    isActive: getIsActive,
    ...rest
  } = props;
  return (
    <PrivateRoute
      path={typeof to === 'object' ? to.pathname : to}
      exact={exact}
      strict={strict}
    >
      {({ location, match }) => {
        const isActive = !!(getIsActive ? getIsActive(match, location) : match);
        return (
          <li
            className={
              isActive ? [activeClassName, className].join(' ') : className
            }
            style={isActive ? { ...style, ...activeStyle } : style}
          >
            <NavLink to={to} {...rest} />
          </li>
        );
      }}
    </PrivateRoute>
  );
};

PrivateLiNavLink.propTypes = {
  to: PropTypes.string,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  activeClassName: PropTypes.string,
  className: PropTypes.string,
  activeStyle: PropTypes.object,
  style: PropTypes.object,
  isActive: PropTypes.func,
};

export default PrivateLiNavLink;
