import { merge } from './components';

export const createSimpleReducer = (initialState, setters) => (state = initialState, action) => {
  const { type, payload } = action;

  const setter = setters[type];
  if (setter) {
    return merge(state, { [setter]: payload });
  }

  return state;
}

export function loadState() {
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
}

export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem('state', serializedState);
  } catch (error) {
    // no-op
  }
}
