import { fromJS } from 'immutable';

const initialState = fromJS({
  tables: [],
  links:[]
});

function tablesReducer(state = initialState, action) {
  switch (action.type) {
    case 'TABLES_LOAD_SUCCESS':
      console.log(action.payload.data);
      return state.set('tables', action.payload.data);
    case 'LINKS_LOAD_SUCCESS':
      console.log('links', action.payload.data);
      return state.set( 'links', action.payload.data);
    case 'RESIZE_TABLE_SUCCESS':
      //console.log('resize');
      return state.update( 'tables', (item) => {
        let position = item.findIndex((pos) => {
          return pos.id == action.payload.data.data[0].id
        })
        console.log(position)
        item[position] = action.payload.data.data[0];
       console.log(item, action.payload.data.data[0]);
        return item});
    case 'POSITION_TABLE_SUCCESS':
      //console.log('position');
      return state.update( 'tables', (item) => {
        let position = item.findIndex((pos) => {
             return pos.id == action.payload.data.data[0].id
        })
        item[position] = action.payload.data.data[0]
        //console.log(item, action.payload.data.data[0]);
        return item});
    case 'CREATE_LINK_SUCCESS':
      console.log('addUrl');
      return state.update( 'links', (item) => {

       item.push(action.payload.data.data[0]);
     console.log(item);
     console.log(action.payload.data.data[0]);
        return item});
    default:
      return state;
  }
}

export default tablesReducer;
