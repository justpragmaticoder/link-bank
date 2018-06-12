/* eslint-disable consistent-return,no-undef */
import { connect } from 'react-redux';
import Link from 'components/Link/Link';
import {loadTables, loadLinks} from 'actions/index.js';
//import { Container, Draggable } from "react-smooth-dnd";
import Draggable, {DraggableCore} from 'react-draggable';
import { applyDrag, generateItems } from "./utils";
import React from 'react';
import './style.scss';


class Tables extends React.PureComponent {
  constructor(props) {
    super(props);
    this.onColumnDrop = this.onColumnDrop.bind(this);
    this.onCardDrop = this.onCardDrop.bind(this);
    this.getCardPayload = this.getCardPayload.bind(this);
  }

  componentWillMount() {
    this.props.getTables();
    if (this.props.tables.tables.length != 0) {
      this.createArr(this.props);
    }
  }

  rendTabs(props) {
    let styleArr = this.createStyle(this.props)
    if (this.props.tables.tables.length != 0) {
      const numbers = props.tables.tables;
      const listItems = numbers.map((number) =>

        (<Draggable>
          <li key={number.id} style={styleArr[number.id]}>
            <div>
              <p>{number.name}</p>


              {this.insertLinks(number.id)}
            </div>
          </li>
        </Draggable>)
      );
      return (
        <ul>{listItems}</ul>
      );
    }
    return <p>What are fuck</p>;
  }

  render() {

    console.log(this.state);
    return (
     /* <div className="card-scene">
        <Container
          orientation="horizontal"
          onDrop={this.onColumnDrop}
          dragHandleSelector=".column-drag-handle"
        >
          {this.state.scene.children.map(column => {
            return (
              <Draggable key={column.id}>
                <div className={column.props.className}>
                  <div className="card-column-header">
                    <span className="column-drag-handle">&#x2630;</span>
                    {column.name}
                  </div>
                  <Container
                    {...column.props}
                    groupName="col"
                    onDragStart={e => console.log("drag started", e)}
                    onDragEnd={e => console.log("drag end", e)}
                    onDrop={e => this.onCardDrop(column.id, e)}
                    getChildPayload={index =>
                      this.getCardPayload(column.id, index)
                    }
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    onDragEnter={() => {
                      console.log("drag enter:", column.id);
                    }}
                    onDragLeave={() => {
                      console.log("drag leave:", column.id);
                    }}
                  >
                    {column.children.map(card => {
                      return (
                        <Draggable key={card.id}>
                          <div {...card.props}>
                            <p>{card.data}</p>
                          </div>
                        </Draggable>
                      );
                    })}
                  </Container>
                </div>
              </Draggable>
            );
          })}
        </Container>
      </div>*/
     <div>
          {this.rendTabs(this.props)}
      </div>
    );
  }

  getCardPayload(columnId, index) {
    return this.state.scene.children.filter(p => p.id === columnId)[0].children[
      index
      ];
  }

  onColumnDrop(dropResult) {
    const scene = Object.assign({}, this.state.scene);
    scene.children = applyDrag(scene.children, dropResult);
    this.setState({
      scene
    });
  }

  onCardDrop(columnId, dropResult) {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const scene = Object.assign({}, this.state.scene);
      const column = scene.children.filter(p => p.id === columnId)[0];
      const columnIndex = scene.children.indexOf(column);

      const newColumn = Object.assign({}, column);
      newColumn.children = applyDrag(newColumn.children, dropResult);
      scene.children.splice(columnIndex, 1, newColumn);
    }
  }
     createArr(props) {
        this.setState({scene: {
          type: "container",
            props: {
            orientation: "horizontal"
          },
          children: this.props.tables.tables.map( item => ({
            id: `column${item.id}`,
            type: "container",
            name: columnNames[item.names],
            props: {
              orientation: "vertical",
              className: "card-container"
            },
            children: generateItems(+(Math.random() * 10).toFixed() + 5, j => ({
              type: "draggable",
              id: `${i}${j}`,
              props: {
                className: "card",
                style: { backgroundColor: pickColor() }
              },
              data: lorem.slice(0, Math.floor(Math.random() * 150) + 30)
            }))
          }))
        }
      });
    }
/*insertLinks(item){
  const listLinks = this.props.tables.links.map(link => {
      if (link.tableID == item) {
       <li> <Link link={link.url} text={link.text}/></li>
      }
    }
  );
  console.log(listLinks);
  return listLinks;
}*/
  createStyle(props) {
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
          /*  width: width + 'px',
            height: height + 'px',
             position: 'absolute',
                 top: '10 px',
                 left: globWidth  + 'px',*/
        }
        globWidth += (width + 10)
        styleArr[item.id] = divStyle;
      });
      return styleArr;
    }
  }
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
  }}
  ))(Tables);

