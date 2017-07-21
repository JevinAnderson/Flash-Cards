import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { bind, capitalizeFirstLetter, merge } from '../../utilities/components';
import TextInput from '../common/text-input';
import TextArrayUpdater from './text-array-editor';

const SETTER_KEYS = ['header', 'description', 'messages'];

class FaceEditor extends PureComponent {
  constructor(props) {
    super(props);

    SETTER_KEYS.forEach(key => {
      this[`set${capitalizeFirstLetter(key)}`] = value => {
        this.update(key, value);
      };
    });
  }

  update(key, value) {
    const { update, face } = this.props;

    update(merge(face, {
      [key]: value
    }));
  }

  render() {
    const { header = '', description = '', messages = {} } = this.props.face;

    return (
      <div className="face-editor">
        <div className="row">
          <h3>
            {this.props.label}
          </h3>
        </div>
        <div className="row">
          <span className="label">Header</span>
          <TextInput value={header} update={this.setHeader} />
        </div>
        <div className="row">
          <span className="label">Description</span>
          <TextInput value={description} update={this.setDescription} />
        </div>
        <div className="row">
          <TextArrayUpdater
            label="Message"
            value={messages}
            update={this.setMessages}
          />
        </div>
      </div>
    );
  }
}

FaceEditor.propTypes = {
  label: PropTypes.string,
  face: PropTypes.object,
  update: PropTypes.func
};

FaceEditor.defaultProps = {};

export default FaceEditor;
