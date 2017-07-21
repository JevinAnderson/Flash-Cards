import { set } from '../utilities/actions';
import { SET_CARDS } from '../constants/cards';

export const setCards = cards => set(SET_CARDS, cards);
