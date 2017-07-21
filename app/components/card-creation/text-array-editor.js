import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';

import { bind, merge } from '../../utilities/components';
import TextInput from '../common/text-input';

class TextArrayUpdater extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    bind(this, 'addChild', 'update');
  }

  addChild() {
    this.update(v4(), '');
  }

  update(key, value) {
    this.props.update(
      merge(this.props.value, {
        [key]: value
      })
    );
  }

  render() {
    const { value = {} } = this.props;
    const keys = Object.keys(value);

    const content = keys.map(key =>
      <TextInput
        key={key}
        value={value[key]}
        onEnter={this.addChild}
        update={input => this.update(key, input)}
      />
    );

    return (
      <div className="text-array-updater">
        <div className="label">
          {this.props.label || 'no label'}
        </div>
        {content}
        <button className="add-child-button" onClick={this.addChild}>
          Add {this.props.label}
        </button>
      </div>
    );
  }
}

TextArrayUpdater.propTypes = {
  label: PropTypes.string,
  value: PropTypes.object,
  update: PropTypes.func
};

export default TextArrayUpdater;
