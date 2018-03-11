// import axios from 'axios';
// import history from '../history';

/**
 * ACTION TYPES
 */
const SELECT_MELODY = 'SELECT_MELODY';
const REMOVE_MELODY = 'REMOVE_MELODY';

/**
 * ACTION CREATORS
 */
export const selectMelody = melody => ({ type: SELECT_MELODY, melody });
export const removeMelody = () => ({ type: REMOVE_MELODY });

/**
 * THUNK CREATORS
 */
// export const me = () =>
//   dispatch =>
//     axios.get('/auth/me')
//       .then(res =>
//         dispatch(getUser(res.data || defaultUser)))
//       .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = {}, action) {
  switch (action.type) {
    case SELECT_MELODY:
      return action.melody;
    case REMOVE_MELODY:
      return {};
    default:
      return state;
  }
}
