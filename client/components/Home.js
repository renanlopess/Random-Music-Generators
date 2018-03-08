import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Melody} from './Melody';

/**
 * COMPONENT
 */
export const Home = (props) => {
  return (
    <Melody />
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  };
};

export default connect(mapState)(Home);

