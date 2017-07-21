import { SET_CARDS } from '../constants/cards';

const initialState = [];

export default function cardsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_CARDS:
      return payload;
    default:
      return state;
  }
}
