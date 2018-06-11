/* eslint-disable consistent-return,no-undef */
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {loadTables, loadLinks} from 'actions/index.js';


class Tables extends React.PureComponent {
  constructor(props) {
    super(props);
<<<<<<< HEAD
    this.state = { answer: [] };
    console.log(this.state);
=======
>>>>>>> eaa4268e230a81101740e9dc9edd973157c8190e
    // console.log(loadTables);
  }
  componentWillMount() {
    this.props.getTables();
	  //this.props.getLinks();
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
<<<<<<< HEAD
		  position: 'absolute',
		  top: x + ' px',
		  left: y + ' px'
=======
		      position: 'absolute',
		      top: x + ' px',
		      left: y + ' px',
>>>>>>> eaa4268e230a81101740e9dc9edd973157c8190e
		}
        styleArr[item.id] = divStyle;
      });
     // console.log(styleArr);
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
    getTables: () => {
      dispatch(loadTables());
    },
	getLinks: () => {
	  dispatch(loadLinks());
	}
  }
  ))(Tables);

