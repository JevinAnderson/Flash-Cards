import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { bind, join } from '../../utilities/components';
import { isFunction } from '../../utilities/type-comparison';

class TextInput extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};

    bind(this, 'onKeyPress', 'update');
  }

  onKeyPress({ key, target: { value } }) {
    if (key === 'Enter' && isFunction(this.props.onEnter)) {
      this.props.onEnter(value || '');
    }
  }

  update({ target: { value } }) {
    const { update } = this.props;

    if (update && isFunction(update)) {
      update(value || '');
    }
  }

  render() {
    const {
      className,
      onChange,
      update,
      onEnter,
      ...rest
    } = this.props;

    return (
      <input
        type="text"
        className={join('text-input', className)}
        onKeyPress={this.onKeyPress}
        onChange={onChange || this.update}
        {...rest}
      />
    );
  }
}

TextInput.propTypes = {
  className: PropTypes.string,
  onEnter: PropTypes.func,
  update: PropTypes.func
};

TextInput.defaultProps = {};

export default TextInput;
