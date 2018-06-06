import { fromJS } from 'immutable';
import axios from 'axios';


// The initial state of the App
/*var initData = [];
function setInitData(initData, data){
  	initData = data;
}*/
axios.post('http://localhost:3001/update-table').then((response)=>{
  // setInitData(initData, response.data);
   console.log(response.data);
  }).catch(function (error) {
    console.log(error);
  });
//   console.log(initData[0]);

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
