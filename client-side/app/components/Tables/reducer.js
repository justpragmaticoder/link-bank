import { fromJS } from 'immutable';

const initialState = fromJS({
  tables: [],
  links:[]
});

function tablesReducer(state = initialState, action) {
  switch (action.type) {
    case 'TABLES_LOAD_SUCCESS':
      console.log(action.payload.data);
      return state.set( 'tables', action.payload.data);
    case 'LINKS_LOAD_SUCCESS':
      console.log(state.get('tables'));
      return state.set( 'links', action.payload.data);
    default:
      return state;
  }
}

export default tablesReducer;
