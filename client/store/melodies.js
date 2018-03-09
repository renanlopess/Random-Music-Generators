// import axios from 'axios';
// import history from '../history';
import getRandomMelody from '../../script/getRandomMelody';

/**
 * ACTION TYPES
 */
const GENERATE_MELODIES = 'GENERATE_MELODIES';

/**
 * ACTION CREATORS
 */
export const generateMelodies = config => ({type: GENERATE_MELODIES, melodies: getRandomMelody(config)});

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
export default function (state = [], action) {
  switch (action.type) {
    case GENERATE_MELODIES:
      return action.melodies;
    default:
      return state;
  }
}
