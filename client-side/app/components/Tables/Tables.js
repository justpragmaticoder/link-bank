/* eslint-disable consistent-return,no-undef */
import { connect } from 'react-redux';
import LinkList from 'components/Link/Link';
import {loadTables, loadLinks, resizeTable, positionTable, deleteLink, deleteTable} from 'actions/index.js';
//import { Container, Draggable } from "react-smooth-dnd";
import Rnd from 'react-rnd';
import {bindActionCreators} from 'redux';
import Draggable, {DraggableCore} from 'react-draggable';
import { applyDrag, generateItems } from "./utils";
import React from 'react';
import './style.scss';


class Tables extends React.PureComponent {
  constructor(props) {
    super(props);
    this.delElem = this.delElem.bind(this);
  }

  componentWillMount() {
    this.props.getTables();
    if (this.props.tables.tables.length !== 0) {
      this.setState({windWidth: window.innerWidth});

    }
  }

  resizeTable(data){
    let id = data.children[1].getAttribute('id');
    this.props.resizeTables(data.offsetHeight, data.offsetWidth, id)
  }
  DraggableEventHandler = (data) => {
    let id = data.node.children[0].getAttribute('id');
    let i = data.node.children[0].getBoundingClientRect();
    this.props.positionTable(i.left, i.top, id);
  };
delElem(id){
  if(id.target.getAttribute('data-elem') == 'link') {
    this.props.deleteLink(id.target.getAttribute('data-del'));
  }else if(id.target.getAttribute('data-elem') == 'table'){
    this.props.deleteTable(id.target.getAttribute('data-del'));
  }

}
arrLink(number){
      let arr = this.props.tables.links.filter((item) => {
        return item.tableID === number
      });

  return <ul>{arr.map(item => <li ><a href={item.url}>{item.text}</a>
    <button data-elem="link" data-del={item.linkID} onClick={this.delElem}>x</button></li>)}</ul>
}
  rendTabs(props) {
    if (this.props.tables.tables.length !== 0) {
      const numbers = props.tables.tables;
      const listItems = numbers.map((number, key) =>
        ( <Rnd
          style={{border: '2px solid black', position: 'absolute', top: number.y, left: number.x}}
          size={{ width: number.width, height: number.height }}
          //position={{ x: number.x, y: number.y }}
          onDragStop={(e, d) => {
            this.DraggableEventHandler(d) }}
          onResize={(e, direction, ref, delta, position) => {
            this.resizeTable(ref, position);
          }}
        >
          <li id={number.id} data-pos={key}>
           <h3> {number.name} <button data-elem="table" data-del={number.id} onClick={this.delElem}>x</button></h3>
            {this.arrLink(number.id)}
          </li>
        </Rnd>)
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

/*  createStyle(props) {
    const styleArr = {};
    if (this.props.tables.tables.length != 0) {
      let globWidth = 0;
      const numbers = props.tables.tables;
      numbers.forEach((item, index) => {
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
          top: x + 'px',
          left: y  + 'px',
        };
        globWidth += (width + 10);
        styleArr[item.id] = divStyle;
      });
      return styleArr;
    }
  }*/
}
export default connect(
  (state) => ({
    tables: state.get('tables').toJS(),
  }),
  (dispatch) => ({
    getTables: () => {
      dispatch(loadTables()).then(() => {
	  dispatch(loadLinks());
	});
  }, resizeTables: (height, width, pos, id) => {
      dispatch(resizeTable(height, width, pos, id));
    },
      positionTable: (x, y, pos, id) => {
      dispatch(positionTable(x, y, pos, id))
      },
      deleteLink: (id) => {
      dispatch(deleteLink(id))
      },
      deleteTable: (id) => {
        dispatch(deleteTable(id))
      },
    }
  ))(Tables);

