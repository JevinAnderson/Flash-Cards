import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { resetCard, setCard } from '../../actions/card';

class CardCreation extends PureComponent {
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

  style() {
    return {
      display: this.props.user ? undefined : 'none'
    };
  }

  render() {
    return (
      <div className="card-creation" style={this.style()}>
        card-creation coming soon...
      </div>
    );
  }
}

CardCreation.propTypes = {
  card: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = ({ card, user }) => ({ card, user });
const mapDispatchToProps = dispatch => ({
  resetCard: () => dispatch(resetCard()),
  setCard: card => dispatch(setCard(card))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardCreation);
