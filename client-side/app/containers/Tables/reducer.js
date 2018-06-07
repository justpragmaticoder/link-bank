import { fromJS } from 'immutable';
import axios from 'axios';

const initialState = fromJS({});

function tablesReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_TABLES':
      return state.set("tables", action.payload)
    default:
      return state;
  }
}

export default tablesReducer;
