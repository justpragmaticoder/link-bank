import axios from 'axios';

export function addTables() {
  return dispatch => {
    return axios.post('http://localhost:3001/update-table').then((response)=>{
      dispatch( tables(response.data));
    });
  }
}
export function tables(tables) {
    return{
      type: ADD_TABLE,
      tables: tables
    }
}
