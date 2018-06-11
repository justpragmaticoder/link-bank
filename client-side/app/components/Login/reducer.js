import { fromJS } from 'immutable';

const initialState = fromJS({
//   forms: []
    data: {
        login: "",
        password: ""
    }
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_FORMS_LOAD_SUCCESS':
    console.log(action.payload.data);
      return state.set('data', action.payload.data);
    case 'SOMETHING2222':
    console.log(2);
        return state.set('chtoto', action.payload);
    default:
      return state;
  }
}

export default loginReducer;
