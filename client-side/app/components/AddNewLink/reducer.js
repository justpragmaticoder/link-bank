import {fromJS} from 'immutable';

const initialState = fromJS({
  tables: [],

});

function addLinkReducer(state = initialState, action) {
  if (action.type === 'GET_TABLES_LIST') {
    return {...state, tables: action.payload.data};
  }
  return state;
}

export default addLinkReducer;
