/* eslint-disable consistent-return,no-undef */
import { connect } from 'react-redux';
import React from 'react';
import {sendLinkData} from 'actions/addLinkAction';
import {loadTables, loadLinks} from 'actions/index.js';
import {Form, Input, Button, Select, Icon,  Modal} from 'antd';
//import './style.scss';
const FormItem = Form.Item;
const regArray= {
  'login': /^[a-zA-Z]+$/,
  'password': /^[a-zA-Z0-9]+$/,
}

class AddLink extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  validateField = (data, text)=>{
    if (data.length == 0) {
      return {
          status: "error",
          data: `${text} is empty`
      }
  }
  if (!regArray[text].test(data)) {
      return {
          status: "error",
          data: `${text} is not valid`
      }
  }
  if (data.length >20 || data.length <5){
      return {
          status: "error",
          data: `${text} must be less than 20 and greater than 5 letters`
      }
  }
  return {
      status: "ok",
      data: ""
  }
  }
  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    // this.handleSubmit(e);
    //Знаю что криво
    let tableName = document.getElementById('table').value;
    let url = document.getElementById('url').value;
    let linkName = document.getElementById('linkName').value;
    let tableID = this.props.tables.tables.find((item) =>{
      return item.name === tableName});
   if(tableID === undefined){
      if(Number.isInteger(tableName)){
        tableID = tableName.toString();
      }else{tableID = tableName;}
   }else{
      tableID = tableID.id;
   }
    this.props.addLink(tableID, linkName, url);
    setTimeout(()=>{this.props.getTables()}, 500)
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log( e.target[1])
    console.log( e.target[2]);
    let tableID = this.props.tables.tables.find((item) =>{
      return item.name === e.target[0].value});
   if(tableID === undefined){
      if(Number.isInteger(e.target[0].value)){
        tableID = e.target[0].value.toString();
      }else{tableID = e.target[0].value;}
   }else{
      tableID = tableID.id;
   }
    this.props.addLink(tableID, e.target[1].value, e.target[2].value);
    setTimeout(()=>{this.props.getTables()}, 500)
    console.log( e.target[1].value, e.target[2].value);
};

  render() {
    console.log(this.props);
    return (
      <div>
        <div className="addlink">
          <Button type="primary" onClick={this.showModal}>
            <i className="material-icons">add_circle</i>
          </Button>
        </div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          okText="Add link"
          onCancel={this.handleCancel}
        >
        <Form id="someForm" onSubmit={this.handleSubmit} className="newLink-form">
         <FormItem>
           <Input 
           prefix={<Icon type="table" style={{ color: 'rgba(0,0,0,.25)' }} />} 
           placeholder="Table"
           name="table"
           id="table"
           />
          </FormItem>
          <FormItem>
            <Input 
            prefix={<Icon type="star-o" style={{ color: 'rgba(0,0,0,.25)' }} />} 
            placeholder="Name" 
            name="linkName"
            id="linkName"
            />
          </FormItem>
          <FormItem>
            <Input 
            prefix={<Icon type="link"  style={{ color: 'rgba(0,0,0,.25)' }} />}  
            placeholder="URL" 
            name="url"
            id="url"
            />
          </FormItem>
          {/* <Button type="primary" htmlType="submit">Add</Button> */}
        </Form>
        </Modal>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    tables: state.get('tables').toJS(),

  }),
  (dispatch) => ({
      addLink: (table, name, url) => {
        dispatch(sendLinkData(table, name, url))
      },
      getTables: () => {
        dispatch(loadTables()).then(() => {
          dispatch(loadLinks())
        });
      }
    }
  ))(AddLink);
