import { fromJS } from 'immutable';

const initialState = fromJS({
  tables: [],
  links:[],
  update: false,
});

function tablesReducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_TABLES':
      return state.set('update', !state.get('update'));
    case 'TABLES_LOAD_SUCCESS':
      //console.log(action.payload.data);
      return state.set( 'tables', action.payload.data);
    case 'LINKS_LOAD_SUCCESS':
      //console.log(state.get('tables'));
      return state.set( 'links', action.payload.data);
    case 'RESIZE_TABLE':
      console.log('resize');
      return state.update( 'tables', (item) => {
        let some = item[action.payload.pos];
        console.log(action.payload.pos);
        some.width = action.payload.width;
        some.height = action.payload.height;
        item[action.payload.pos] = some;
        return item});
   /* case 'RESIZE_TABLE_SUCCESS':
      //console.log('resize');
      return state.update( 'tables', (item) => {
        let position = item.findIndex((pos) => {
          return pos.id === action.payload.data.data[0].id
        })
          console.log(action.payload.data.data[0]);
          console.log(position);
        item[position] = action.payload.data.data[0]
       // console.log(item, action.payload.data.data[0]);
        return item});*/
    case 'POSITION_TABLE_SUCCESS':
      //console.log('position');
      return state.update( 'tables', (item) => {
        let position = item.findIndex((pos) => {
             return pos.id === action.payload.data.data[0].id
        })
        item[position] = action.payload.data.data[0]
        //console.log(item, action.payload.data.data[0]);
        return item});
    default:
      return state;
  }
}

export default tablesReducer;
