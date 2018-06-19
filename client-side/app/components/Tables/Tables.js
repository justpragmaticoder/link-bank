/* eslint-disable consistent-return,no-undef */
import { connect } from 'react-redux';
import AddLink from 'components/AddLink/AddLink.js';
import {loadTables, loadLinks, resizeTable, positionTable, deleteLink, deleteTable, update} from 'actions/index.js';
//import { Container, Draggable } from "react-smooth-dnd";
import Rnd from 'react-rnd';
import {bindActionCreators} from 'redux';
import Draggable, {DraggableCore} from 'react-draggable';
//import { applyDrag, generateItems } from "./utils";
import React from 'react';
import './style.scss';


class Tables extends React.PureComponent {
  constructor(props) {
    super(props);
    this.delElem = this.delElem.bind(this);
    this.editLink = this.editLink.bind(this);
    this.state = {tables: this.props.tables.tables
    }
  }

  componentWillMount() {
    let id = localStorage.getItem('userId');
    console.log(id);
    this.props.getTables();
    if (this.props.tables.tables.length !== 0) {
      this.setState({windWidth: window.innerWidth});

    }
  }


  resizeTable(data){
    let id = data.children[1].getAttribute('data-id');
    let pos = data.children[1].getAttribute('data-pos');
    console.log(data);
    setTimeout(()=>{
      this.props.resizeTables(data.offsetHeight, data.offsetWidth, pos, id);

    }, 500)
    //this.setState({position: ''})
  }
  DraggableEventHandler = (e, data) => {
    let id = data.node.children[0].getAttribute('data-id');
    let i = data.node.children[0].getBoundingClientRect();
    this.props.positionTable(i.left - 10, i.top - 10, id);
  };
delElem(id){
  if(id.target.getAttribute('data-elem') == 'link') {
    this.props.deleteLink(id.target.getAttribute('data-del'));
  }else if(id.target.getAttribute('data-elem') == 'table'){
    this.props.deleteTable(id.target.getAttribute('data-del'));
  }
  setTimeout(()=>{this.props.getTables()}, 500)
}

arrLink(number){
      let arr = this.props.tables.links.filter((item) => {
        return item.tableID === number
      });

  return <ul>{arr.map((item, i) => <li ><a key={i} href={item.url}>{item.text}</a>
    <i className="material-icons delete-button" data-elem ="link" data-del={item.linkID} onClick={this.delElem}>delete</i></li>)}</ul>
}
editLink(){

}
  rendTabs(props) {
    if (this.props.tables.tables.length !== 0) {
      const numbers = props.tables.tables;
      const listItems = numbers.map((number, i) =>
        (
          <Rnd
          key={i}
          //ref={c => { this.rnd[number.id] = c; }}
          style={{ width: number.width, height: number.height, /*position: 'absolute',*/ top: number.y, left: number.x}}
         // default={{ x: number.x, y: number.y, width: number.width, height: number.height}}
          size={{ width: number.width, height: number.height }}
          //position={{ x: number.x, y: number.y }}
          onDragStop={(e, d) => {
            this.DraggableEventHandler(e, d);
          }}
          onResize={(e, direction, ref, delta, position) => {
            this.resizeTable(ref);
            this.setState({position: position})
          }}
          onResizeStop={(e, direction, ref, delta, position)=>{
            this.resizeTable(ref);
           this.setState({position: ref.offsetHeight})
          }}

        ><li data-id={number.id} data-pos={i}/*style={{width: number.width, height: number.height,}}*/ key={number.id}  className="my-table">
           <h3  > <span>{number.name}</span>
           <div className="top-container"><i data-edit={number.id} onClick={this.editLink}>edit</i>
            <i className="material-icons" data-elem="table" data-del={number.id} onClick={this.delElem}>clear</i>
            </div></h3>
            {this.arrLink(number.id)}
          </li>
        </Rnd> )
      );
      return (
        <ul>{listItems}</ul>
      );
    }
    return <p>Here can be your links</p>;
  }

  render() {
    return (
     <div>
       <AddLink title={'Create link'}/>
       {this.rendTabs(this.props)}
      </div>
    );
  }

}
export default connect(
  (state) => ({
    tables: state.get('tables').toJS(),
    loginForm: state.get('login').toJS()
  }),
  (dispatch) => ({
    getTables: () => {
      dispatch(loadTables()).then(() => {
	  dispatch(loadLinks())
	});
  }, resizeTables: (height, width, pos, id) => {
      dispatch(resizeTable(height, width, pos, id))
    },
      positionTable: (x, y, id) => {
      dispatch(positionTable(x, y, id))
      },
      deleteLink: (id) => {
      dispatch(deleteLink(id))
      },
      deleteTable: (id) => {
        dispatch(deleteTable(id))
      },
    }
  ))(Tables);

