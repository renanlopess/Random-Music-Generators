import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Input, Menu } from 'semantic-ui-react';
// import Subnav from './subnav';
import { logout } from '../../store';
import historyNav from '../../history-nav';


const mainLinks = [
  {
    key: 0,
    name: 'melody'
  },
  {
    key: 1,
    name: 'rhythm'
  }
];

const DEFAULT_NAV_STATE = mainLinks[0].name;

/* Global mainLinks */
const validateRoute = (currentRouteSlice) =>
  mainLinks.find(link => link.name === currentRouteSlice);


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: DEFAULT_NAV_STATE };
  }

  componentDidMount() {
    /* A silly workaround to make sure that the active nav is correct */
    const currentRoute = this.props.location.pathname.slice(1);
    console.log(currentRoute)
    if (validateRoute(currentRoute)) {
      this.setState({ activeItem: currentRoute });// eslint-disable-line react/no-did-mount-set-state
    }
  }

  handleItemClick = (event, { name }) => {
    this.setState({ activeItem: name });
    historyNav(`/${name}`);
  }

  createNav = (links) => {
    return links.map(link => {
      const { key, name } = link;
      const { activeItem } = this.state;
      return <Menu.Item key={key} name={name} active={activeItem === name} onClick={this.handleItemClick} />;
    });
  };

  render() {
    const { activeItem } = this.state;
    const { isLoggedIn, handleClick } = this.props;

    return (
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
        <div className="nav-menu-main">
        <Menu secondary stackable>
          {this.createNav(mainLinks, activeItem)}
          {
            /*
          <Menu.Menu position="right">
            <Menu.Item
              name="logout"
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
          */
        }
        </Menu>
        </div>
        </div>
        <hr />
      </div>
    );
  }
}

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

export default withRouter(connect(mapState, mapDispatch)(Navbar));

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
