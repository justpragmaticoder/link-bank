import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';


class Tables extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {answer: []};
  }
  componentWillMount() {
    axios.post('http://localhost:3001/update-table').then((response) => {
      this.props.onShowTables(response.data);
    });
  }
  render() {
    console.log(this.props.table)
    return (
      <div>
      </div>
  );
  }
}

export default connect(
  state => ({
    tables: state.tables,
  }),
  dispatch => ({
    onShowTables: (data) => {
      dispatch( {type: 'SHOW_TABLES', payload: data})
    }
  })
)(Tables);

