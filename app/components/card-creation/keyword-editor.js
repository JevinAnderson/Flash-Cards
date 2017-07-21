import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { bind, merge } from '../../utilities/components';
import TextInput from '../common/text-input';

class KeywordEditor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = this.mapPropsToState(props);

    bind(this, 'addChild', 'updateStateKeywords', 'update');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.keywords !== this.props.keywords) {
      const state = this.mapPropsToState(nextProps);

      this.setState(state);
    }
  }

  mapPropsToState({ keywords = {} }) {
    return {
      keywords: Object.keys(keywords)
    };
  }

  addChild() {
    this.setState(
      prevState => ({
        keywords: [...prevState.keywords, '']
      }),
      this.update
    );
  }

  arrayToObject(keywords) {
    return keywords.reduce((results, keyword) => {
      results[keyword] = true;

      return results;
    }, {});
  }

  updateStateKeywords(index, value) {
    const keywords = [...this.state.keywords];

    keywords.splice(index, 1, value);

    this.setState({ keywords }, this.update);
  }

  update() {
    const keywords = this.arrayToObject(this.state.keywords);

    this.props.update(keywords);
  }

  render() {
    const { keywords = [] } = this.state;

    const content = keywords.map((keyword, index) =>
      <TextInput
        key={index}
        value={keyword}
        onEnter={this.addChild}
        update={input => this.updateStateKeywords(index, input)}
      />
    );

    return (
      <div className="keyword-editor">
        <div className="label">Keywords</div>
        {content}
        <button className="add-child-button" onClick={this.addChild}>
          Add keyword
        </button>
      </div>
    );
  }
}

KeywordEditor.propTypes = {
  keywords: PropTypes.object,
  update: PropTypes.func
};

KeywordEditor.defaultProps = {};

export default KeywordEditor;
