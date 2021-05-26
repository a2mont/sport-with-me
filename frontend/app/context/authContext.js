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
    const newPerson = await Api.createUser(values)
      //.then(response => {
      //console.log(response);
      /* const email = values.email;
      const password = values.password;
      signin({email,password}).then(
        console.log('ar')); */
    //})
    ;
  };
};

const signin = (dispatch) => {
  return async ({email, password}) => {
    const token = await Api.login({email,password}).then(response => {
      //console.log(token);
      console.log('Signin');
      //console.log(response);
      dispatch({
        type: 'signin',
        payload: {
          token: response.token,
          email,
          id: response.id
        },
      });
    }).catch(error => console.log('error signing in'));
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