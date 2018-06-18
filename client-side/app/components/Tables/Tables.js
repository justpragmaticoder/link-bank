/* eslint-disable consistent-return,no-undef */
import { connect } from 'react-redux';
import AddLink from 'components/AddLink/AddLink.js';
import {loadTables, loadLinks, resizeTable, positionTable, deleteLink, deleteTable} from 'actions/index.js';
import Rnd from 'react-rnd';
import React from 'react';
import './style.scss';


class Tables extends React.PureComponent {
  constructor(props) {
    super(props);
    this.delElem = this.delElem.bind(this);
    this.state = {tables: this.props.tables.tables
    }
  }

  componentWillMount() {
    this.props.getTables();
    if (this.props.tables.tables.length !== 0) {
      this.setState({windWidth: window.innerWidth});
    }
  }
  resizeTable(data){
    let id = data.children[1].getAttribute('id');
    let pos = data.children[1].getAttribute('data-pos');
    console.log(data);
    setTimeout(()=>{
      this.props.resizeTables(data.offsetHeight, data.offsetWidth, pos, id);
    }, 500)
  }
  DraggableEventHandler = (data) => {
    let id = data.node.children[0].getAttribute('id');
    console.log(data.node);
    let i = data.node.children[0].getBoundingClientRect();
    console.log(i);
    this.props.positionTable(i.x, i.y, id);
  };
  delElem(id){
  if(id.target.getAttribute('data-elem') === 'link') {
    this.props.deleteLink(id.target.getAttribute('data-del'));
  }else if(id.target.getAttribute('data-elem') === 'table'){
    this.props.deleteTable(id.target.getAttribute('data-del'));
  }

}

  arrLink(number){
      let arr = this.props.tables.links.filter((item) => {
        return item.tableID === number
      });

  return <ul>{arr.map((item, i) => <li ><a key={i} href={item.url}>{item.text}</a>
    <button data-elem="link" data-del={item.linkID} onClick={this.delElem}>x</button></li>)}</ul>
}
  rendTabs(props) {
    if (this.props.tables.tables.length !== 0) {
      const numbers = props.tables.tables;
      const listItems = numbers.map((number, i) =>


         ( <li style={{width: number.width, height: number.height,}} key={number.id}>
          <Rnd
            key={i}
            style={{ width: number.width, height: number.height, border: '2px solid black', /*position: 'absolute',top: number.y, left: number.x*/}}
            size={{ width: number.width, height: number.height }}
            onDragStop={(e, d) => {
               this.DraggableEventHandler(d);
             }}
            onResize={(e, direction, ref, delta, position) => {
                this.resizeTable(ref);
                this.setState({position: position})
                }}
            onResizeStop={(e, direction, ref, delta, position)=>{
              this.resizeTable(ref);
              this.setState({position: ref.offsetHeight})
              }}
             >

           <h3  id={number.id} data-pos={i}> {number.name} <button data-elem="table" data-del={number.id} onClick={this.delElem}>x</button></h3>
            {this.arrLink(number.id)}

        </Rnd> </li>)
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
      <div><AddLink/></div>
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

