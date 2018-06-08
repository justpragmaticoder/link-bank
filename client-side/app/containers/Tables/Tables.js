import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';


class Tables extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {answer: []};
   // this.tables.tables = {id: 0, tableName: 'Sorry'}
  }
  componentWillMount() {
    axios.post('http://localhost:3001/update-table').then((response) => {
      this.props.onShowTables(response.data);
    });
  }
  rendTabs(){
    if(this.props.tables.tables != undefined){
    {this.props.tables.tables.map((item) =>
    <li key={item.id}>{item.tableName}</li>
    )}}else{
      return <li>Sorry</li>
    }
  }
  render() {
    if(this.props.tables.tables != undefined) {
      console.log(this.props.tables.tables);
    }
    return (
	<div>
     <ul>
      <li>TIMMI!</li>
      </ul>
	  </div>
  );
  }
}

export default connect(
  state => ({
    tables: state.get('tables').toJS(),
  }),
  dispatch => ({
    onShowTables: (data) => {
      dispatch( {type: 'SHOW_TABLES', payload: data})
    }
  })
)(Tables);

