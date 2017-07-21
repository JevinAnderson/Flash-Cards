import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { resetCard, setCard } from '../../actions/card';
import { bind, capitalizeFirstLetter, merge } from '../../utilities/components';
import TextInput from '../common/text-input';
import TextArrayUpdater from './text-array-editor';
import KeywordEditor from './keyword-editor';
import FaceEditor from './face-editor';
import { sanitize } from '../../utilities/firebase';

const SETTER_KEYS = ['back', 'board', 'keywords', 'front'];

class CardCreation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    bind(this, 'save', 'toggle');

    SETTER_KEYS.forEach(key => {
      this[`set${capitalizeFirstLetter(key)}`] = value => {
        this.update(key, value);
      };
    });
  }

  update(key, value) {
    const card = merge(this.props.card, {
      [key]: value
    });

    this.props.setCard(card);
  }

  toggle() {
    this.setState(prevState => ({
      editingBack: !prevState.editingBack
    }));
  }

  style() {
    return {
      display: this.props.user ? undefined : 'none'
    };
  }

  save() {
    const key = firebase.database().ref().child('cards').push().key;
    const updateKey = `/cards/${key}`;
    const updates = { [updateKey]: sanitize(this.props.card) };

    const promise = firebase.database().ref().update(updates);

    promise
      .then(results => {
        this.setState({ error: undefined, editingBack: false });
        this.props.resetCard();
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const { card = {} } = this.props;

    return (
      <div className="card-creation" style={this.style()}>
        <label>
          Board: <TextInput value={card.board || ''} update={this.setBoard} />
        </label>
        {!this.state.editingBack &&
          <FaceEditor label="Front" face={this.props.card.front} update={this.setFront} />}
        {this.state.editingBack &&
          <FaceEditor label="Back" face={this.props.card.back} update={this.setBack} />}
        <button className="toggle-button" onClick={this.toggle}>
          Edit other side
        </button>
        <KeywordEditor keywords={card.keywords} update={this.setKeywords} />
        <button className="save-button" onClick={this.save}>
          Save
        </button>
        {this.state.error &&
          <div className="error-message">
            {this.state.error.message}
          </div>}
        <button className="reset-button" onClick={this.props.resetCard}>
          clear
        </button>
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
