/* eslint-disable consistent-return,no-undef */
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import loadTable from 'actions/index.js';


class Tables extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { answer: [] };
    console.log(this.state);
    // console.log(loadTables);
  }
  componentWillMount() {
    this.props.onShowTables();
  }
  rendTabs(props) {
    if (this.props.tables.tables.length != 0) {
      const numbers = props.tables.tables;
      const styleArr = {};
      numbers.forEach((item) => {
         const width = item.width;
        const height = item.height;
		const x = item.x;
		const y = item.y;
        const divStyle = {
          color: 'red',
          border: '1px solid black',
          width: width + 'px',
          height: height + 'px',
		  position: 'absolute',
		  top: x + ' px',
		  left: y + ' px'
		}
        styleArr[item.id] = divStyle;
      });
      console.log(styleArr);
      const listItems = numbers.map((number) =>

        (<li key={number.id}>
          <div style={styleArr[number.id]}>

            <p>{number.tableName}</p>
          </div>
         </li>)
      );
      return (
        <ul>{listItems}</ul>
      );
    }
    return <p>What are fuck</p>;
  }
  render() {
    return (
      <div>
        {this.rendTabs(this.props)}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    tables: state.get('tables').toJS(),
  }),
  (dispatch) => ({
    onShowTables: () => {
      dispatch(loadTable());
    }
  }
  ))(Tables);

