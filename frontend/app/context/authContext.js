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
    await Api.login({email,password}).then(response => {
      console.log('Signin : ' + response.status);
      if(response.status == 200){
        dispatch({
          type: 'signin',
          payload: {
            token: response.data.token,
            email,
            id: response.data.id
          },
        });
        return 200;
      }else{
        return 404;
      }
        
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