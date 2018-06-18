import { fromJS } from 'immutable';

const initialState = fromJS({
//   forms: []
    userId: {
        message: "",
        token: "",
        login: "",
        id: ""
    },

});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_FORMS_LOAD':
      console.log(action.payload.data);
        return state.set('data', action.payload.data);
    case 'LOGIN_FORMS_LOAD_SUCCESS':
    // console.log(action.payload.data.id);
    // data.id = action.payload.data.id
      localStorage.setItem("userId", action.payload.data.id);
      localStorage.setItem("token", action.payload.data.token);
      localStorage.setItem("token", action.payload.data.login);
      console.log(localStorage.getItem('userId'));
      console.log(action.payload.data);
      return state.set('userId', action.payload.data);
    case 'LOGIN_FORMS_LOAD_FAILURE':
      console.log(action.payload.data);
        return state.set('data', action.payload.data);
    case 'LOAD_TABLES_SUCCESS':
    console.log(2);
        return state.set('auth-data', action.payload);
    default:
      return state;
  }
}

export default loginReducer;
