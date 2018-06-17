/* eslint-disable consistent-return,no-undef */
import { connect } from 'react-redux';
import React from 'react';
import {sendLinkData} from 'actions/addLinkAction'
import {Form, Input, Button, Select, Icon} from 'antd';
//import './style.scss';
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
    this.props.addLink(tableID, e.target[1].value, e.target[2].value)
    console.log( e.target[1].value, e.target[2].value);
};

  render() {
    console.log(this.props);
    return (
        <Form id="someForm" onSubmit={this.handleSubmit} className="newLink-form">
         <FormItem>
              <Input prefix={<Icon type="table" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Table" />
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
      }
    }
  ))(AddLink);
