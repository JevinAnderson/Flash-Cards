import { RESET_CARD, SET_CARD } from '../constants/card';

const initialState = {
  back: {},
  board: undefined,
  keywords: {},
  front: {}
};

export default function cardReducer(state = initialState, { type, payload }) {
  switch (type) {
    case RESET_CARD:
      return initialState;
    case SET_CARD:
      return payload;
    default:
      return state;
  }
}
