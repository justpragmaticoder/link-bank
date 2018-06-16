/* eslint-disable consistent-return,no-undef */
import React from 'react';
import { connect } from 'react-redux';
import loadRegisterForms from 'actions/registerActions.js';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

// import { Button } from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class Register extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        // console.log(loadTables);
      }
      handleClick = ()=>{
          console.log('qq');
          console.log(document.getElementById('qq').value);
      }
      render() {
        return (
          <Form className="login-form">
            <p>Register form</p>
            <FormItem>
                <Input id="qq" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            </FormItem>
            <FormItem>
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            </FormItem>
            <FormItem>
                <Checkbox>Remember me</Checkbox>
              <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.props.sendRegisterForm.bind(this)}>
                Register
              </Button>
            </FormItem>
          </Form>
        );
      }
    }

    export default connect(
        (state) => ({
          login: state.get('tables').toJS(),
        }),
        (dispatch) => ({
          sendRegisterForm: () => {
            dispatch(loadRegisterForms('privet'));
          }
        }
        ))(Register);