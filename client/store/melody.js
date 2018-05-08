
/**
 * ACTION TYPES
 */
const SELECT_MELODY = 'SELECT_MELODY';
const CHANGE_TEMPO = 'CHANGE_TEMPO';
const REMOVE_MELODY = 'REMOVE_MELODY';

/**
 * ACTION CREATORS
 */
export const selectMelody = melody => ({ type: SELECT_MELODY, melody });
export const removeMelody = () => ({ type: REMOVE_MELODY });
export const changeTempo = tempo => ({ type: CHANGE_TEMPO, tempo });

/**
 * REDUCER
 */

const initialState = {tempo: 105};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_MELODY: {
      action.melody.tempo = state.tempo;
      return action.melody;
    }
    case CHANGE_TEMPO:
      return {...state, tempo: action.tempo};
    case REMOVE_MELODY:
      return initialState;
    default:
      return state;
  }
}
