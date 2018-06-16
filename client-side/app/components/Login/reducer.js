import { fromJS } from 'immutable';

const initialState = fromJS({
//   forms: []
    userId: {
        message: "",
        token: "",
        id: ""
    },
    user:{
      username:"",
      password:""
    }
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case '1LOGIN_FORMS_LOAD':
      console.log(action.payload);
        return state.set('data', action.payload.data);
    case 'LOGIN_FORMS_LOAD_SUCCESS':
    // console.log('success');
    // console.log(action);
      return state.set('userId', action.payload);
    case 'LOGIN_FORMS_LOAD_FAILURE':
    console.log(action);
      // console.log(action.payload.data);
        return state.set('userId', action.payload.error);
    case 'LOAD_TABLES_SUCCESS':
    console.log(2);
        return state.set('tables', action.payload.data);
    case 'USERNAME_CHANGE':
    console.log(state);
    return state.set('username',action.payload.username);
    case 'PASSWORD_CHANGE':
    return state.set('password',action.payload.password);
    default:
      return state;
  }
}

export default loginReducer;
