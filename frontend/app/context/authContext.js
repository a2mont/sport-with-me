import dataContext from './dataContext';
import Api from '../api/api';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signout':
      return {token: null, email: ''};
    case 'signin':
    case 'signup':
      return {
        token: action.payload.token,
        email: action.payload.email,
      };
    default:
      return state;
  }
};

const signup = dispatch => {
  return ({email, password}) => {
    console.log('Signup');
  };
};

const signin = (dispatch) => {
  return async ({email, password}) => {
    const token = await Api.login({email,password}).then(token => {
    //console.log(token);
    console.log('Signin');

    dispatch({
      type: 'signin',
      payload: {
        token: token,
        email,
      },
    });
  });
  };
};

const signout = dispatch => {
  return () => {
    console.log('signout');
    dispatch({type: 'signout'});
  };
};

export const {Context, Provider} = dataContext(
  authReducer,
  {signin, signout, signup},
  {token: null, email: ''},
);