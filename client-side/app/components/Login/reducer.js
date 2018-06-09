import { fromJS } from 'immutable';

const initialState = fromJS({
  forms: []
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'FORMS_LOAD_SUCCESS':
    console.log('----');
      console.log(state.get('login'));
      console.log(action);
      console.log('----');
      return state.set( 'login', action.payload.data);
    case 'FORMS_LOAD_FAILS':
    console.log(action.payload);
        return state.set('login', action.payload.data);
    default:
      return state;
  }
}

export default loginReducer;
