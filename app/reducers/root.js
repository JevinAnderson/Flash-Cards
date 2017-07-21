import { combineReducers } from 'redux';

import card from './card';
import cards from './cards';
import user from './user';

export default combineReducers({ card, cards, user });
