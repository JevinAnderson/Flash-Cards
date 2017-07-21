import { perform, set } from '../utilities/actions';
import { RESET_CARD, SET_CARD } from '../constants/card';

export const resetCard = () => perform(RESET_CARD);
export const setCard = card => set(SET_CARD, card);
