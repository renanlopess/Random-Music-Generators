import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Subnav from './subnav';
import { logout } from '../../store';

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <div className="navbar-flex">
      <div className="logo-container">
          <img src="/img/random-music-logo.png" alt="random music logo" className="img-logo" />
          <span className="txt-logo">Random Music Generators</span>
          <img src="/img/random-music-logo.png" alt="random music logo" className="img-logo" />
      </div>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/profile">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div style={{display: 'none'}}>
            {/* The navbar will show these links before you log in */}
            <Link to="">Login</Link>
            <Link to="">Sign Up</Link>
          </div>
        )}
      </nav>
      <Subnav />
    </div>
    <hr />
  </div>
);

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
