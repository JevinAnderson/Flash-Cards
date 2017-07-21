import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Login from '../login/login';
import CardCreation from '../card-creation/card-creation';

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  // componentWillMount(){}
  // componentDidMount(){}
  // componentWillReceiveProps(nextProps) {}
  // shouldComponentUpdate(nextProps, nextState) true
  // componentWillUpdate(nextProps, nextState) {}
  // componentDidUpdate(prevProps, prevState) {}
  // componentWillUnmount() {}
  render() {
    return (
      <div className="main-application">
        <Login />
        Application coming soon...
         <CardCreation />
      </div>
    );
  }
}

Application.propTypes = {};

Application.defaultProps = {};

export default Application;
