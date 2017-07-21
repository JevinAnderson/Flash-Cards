import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setUser } from '../../actions/user';
import { bind } from '../../utilities/components';

class Login extends PureComponent {
  constructor(props) {
    super(props);

    bind(this, 'onAuthStateChanged');
  }
  // componentWillMount(){}
  componentDidMount() {
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }
  // componentWillReceiveProps(nextProps) {}
  // shouldComponentUpdate(nextProps, nextState) true
  // componentWillUpdate(nextProps, nextState) {}
  // componentDidUpdate(prevProps, prevState) {}
  // componentWillUnmount() {}

  onAuthStateChanged(user) {
    if (user) {
      user = {
        id: user.uid,
        email: user.email
      };
    }

    this.props.setUser(user);
  }

  render() {
    return (
      <div className="login" style={{ display: 'none' }}>
        Login coming soon...
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func
};

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
