import React from 'react';
import {connect} from 'react-redux';
import {Form, Input, Button, Select} from 'antd';
import 'antd/dist/antd.css';
import {getTablesData, sendLinkData} from 'actions/AddLinkAction.js';

const Option = Select.Option;
const FormItem = Form.Item;

class AddLink extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getTablesList();
  }

  handleSelect = (value) => {
    console.log(`selected ${value}`);
    return value;
  };

  handleText = (value) => {
    return value;
  };

  handleURL = (value) => {
    return value;
  };

  findTableId = (tables, name) => {
    tables.forEach((item) => {
      if (item.name === name) {
        return item.id;
      }
    });
  };

  sendLinkData = () => {
    let linkText = this.handleText();
    let linkURL = this.handleText();
    let tableName = this.handleSelect();
    let tableID = this.findTableId(this.props.tables, tableName);
    return this.props.createLink({text: linkText, url: linkURL, tableID: tableID});
  };

  render() {
    const selectDefault = this.props.tables[0].name;
    
    return (
      <Form className="newLink-form">
        <FormItem>
          <Input type="text" placeholder="Link text" onChange={this.handleText()}/>
        </FormItem>
        <FormItem>
          <Input type="text" placeholder="Link url" onChange={this.handleURL()}/>
        </FormItem>
        <FormItem>
          <Select defaultValue={selectDefault} onChange={this.handleSelect()} children={this.props.tables.map(
            ({tableData}) => <Option key={tableData}>{tableData.name}</Option>)}>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button"
                  onClick={this.props.sendLinkData.bind(this)}>
            Ok
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default connect(
  (state) => ({
    tables: state.get('tables').toJS()
  }),
  (dispatch) => ({
      getTablesList: () => {
        dispatch(getTablesData());
      },
      createLink: (data) => {
        dispatch(sendLinkData(data));
      },
    }
  ))(AddLink);
