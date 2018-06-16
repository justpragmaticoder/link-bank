import { fromJS } from 'immutable';

const initialState = fromJS({
  user: []
});

function registerReducer(state = initialState, action) {
  switch (action.type) {
    case 'FORMS_LOAD_SUCCESS':
    console.log('----');
      console.log(state.get('register'));
      console.log(action);
      console.log('----');
      return state.set( 'register', action.payload.data);
    case 'FORMS_LOAD_FAILS':
    console.log(action.payload);
        return state.set('register', action.payload.data);
    case 'REG_USERNAME_CHANGE':
      console.log(state);
    return state.set('regUsername',action.payload.regUsername);
    case 'REG1_PASSWORD_CHANGE':
    return state.set('regPassword1',action.payload.regPassword1);
    case 'REG2_PASSWORD_CHANGE':
    return state.set('regPassword2',action.payload.regPassword2);
    default:
      return state;
  }
}

export default registerReducer;
