import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import Thunk from 'redux-thunk';
import throttle from 'lodash/throttle';

import rootReducer from './reducers/root';
import Application from './components/application/application';
import { loadState, saveState } from './utilities/reducers';

const Logger = createLogger({ collapsed: true });
const state = loadState();
const store = createStore(rootReducer, state, applyMiddleware(Thunk, Logger));
window._store = store;

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById('application')
);
