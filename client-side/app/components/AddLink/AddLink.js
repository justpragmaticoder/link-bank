/* eslint-disable consistent-return,no-undef */
import { connect } from 'react-redux';
import React from 'react';
import {sendLinkData} from 'actions/addLinkAction';
import {loadTables, loadLinks} from 'actions/index.js';
import {Form, Input, Button, Icon} from 'antd';

const FormItem = Form.Item;


class AddLink extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log( e.target[1].value, e.target[2].value);
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
    setTimeout(()=>{this.props.getTables()}, 500);
    console.log( e.target[1].value, e.target[2].value);
};

  render() {
    console.log(this.props);
    return (
        <Form id="someForm" onSubmit={this.handleSubmit} className="newLink-form">
         <FormItem>
           <Input prefix={<Icon type="table" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Table or name new table" />
          </FormItem>
          <FormItem>
            <Input prefix={<Icon type="star-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Name" />
          </FormItem>
          <FormItem>
            <Input prefix={<Icon type="link"  style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="URL" />
          </FormItem>
          <Button type="primary" htmlType="submit">Add</Button>
        </Form>
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
