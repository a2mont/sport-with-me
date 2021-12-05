import dataContext from './dataContext';
import Api from '../api/api';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signout':
      return {token: null, email: '', id:null};
    case 'signin':
    case 'signup':
      return {
        email: action.payload.email,
        token: action.payload.token,
        id: action.payload.id,
      };
    default:
      return state;
  }
};

const signup = dispatch => {
  return async (values) => {
    console.log('Signup');
    var status;
    status = await Api.createUser(values);
    return status;
  };
};

const signin = (dispatch) => {
  return async ({email, password}) => {
    const token = await Api.login({email,password}).then(response => {
      console.log('Signin');
      dispatch({
        type: 'signin',
        payload: {
          token: response.token,
          email,
          id: response.id
        },
      });
    }).catch(error => {
      console.log('error signing in');
      return error;
    });
  };
};

const signout = dispatch => {
  return () => {
    dispatch({type: 'signout'});
  };
};

export const {Context, Provider} = dataContext(
  authReducer,
  {signin, signout, signup},
  {token: null, email: ''},
);