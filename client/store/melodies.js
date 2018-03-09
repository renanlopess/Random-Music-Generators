// import axios from 'axios';
// import history from '../history';

/**
 * ACTION TYPES
 */
const GET_MELODIES = 'GET_MELODIES';

/**
 * ACTION CREATORS
 */
export const getMelodies = melodies => ({type: GET_MELODIES, melodies});

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
    case GET_MELODIES:
      return action.melodies;
    default:
      return state;
  }
}
