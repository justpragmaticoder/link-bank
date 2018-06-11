import { fromJS } from 'immutable';

const initialState = fromJS({
//   forms: []
    data: {
        id: "",
        login: "",
        password: ""
    },
    chtoto:{
        qq: 'ffffff'
    }
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    
    case 'LOGIN_FORMS_LOAD_SUCCESS':
    // console.log(action.payload.data.id);
    // data.id = action.payload.data.id
    console.log(state[0]);
      return state.set('userId', action.payload.data);
    case 'LOGIN_FORMS_LOAD_FAILURE':
      console.log(action.payload.data);
        return state.set('data', action.payload);
    case 'LOAD_TABLES_SUCCESS':
    console.log(2);
        return state.set('chtoto', action.payload);
    default:
      return state;
  }
}

export default loginReducer;
