/* eslint-disable consistent-return,no-undef */
import React from 'react';
import { connect } from 'react-redux';
import {loadRegisterForm, loadTablesAfterLogin, usernameChange, password1Change, password2Change} from 'actions/registerActions.js';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

// import { Button } from 'antd';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
const FormItem = Form.Item;

const success = (data, func,param) => {
  message.success(data,5)
  .then(()=>{
    func(param);
  })
};

const error = (data) => {
  message.error(data);
};
class Register extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        // console.log(loadTables);
      }
      handleClick=()=>{
          this.props.sendRegisterForm({
            login: this.props.register.regUsername,
            password: this.props.register.regPassword1
          });
          success('Register is Ok',this.props.history.push,'/login');
          // this.props.history.push('/');

          console.log(this.props.sendRegisterForm);
      }
      handleUsernameChange(event){
        this.props.onUsernameChange({regUsername:event.target.value});
      }
      handlePassword1Change(event){
        this.props.onPassword1Change({regPassword1:event.target.value});
      }
      handlePassword2Change(event){
        this.props.onPassword2Change({regPassword2:event.target.value});
      }
      render() {
        return (
          <Form className="login-form">
            <p>Register form</p>
            <FormItem>
                <Input 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder="Username"
                onChange = {this.handleUsernameChange.bind(this)}
                />
            </FormItem>
            <FormItem>
                <Input 
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                type="password" 
                placeholder="Password"
                onChange = {this.handlePassword1Change.bind(this)}
                />
            </FormItem>
            <FormItem>
                <Input 
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                type="password" 
                placeholder="Password" 
                onChange = {this.handlePassword2Change.bind(this)}
                />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleClick.bind(this)}>
                Register
              </Button>
            </FormItem>
          </Form>
        );
      }
    }

    export default connect(
        (state) => ({
          register: state.get('register').toJS(),
        }),
        (dispatch) => ({
          sendRegisterForm: (data) => {
            dispatch(loadRegisterForm(data));
          },
          onUsernameChange: (data) => {
            dispatch(usernameChange(data));
          },
          onPassword1Change: (data) => {
            dispatch(password1Change(data));
          },
          onPassword2Change: (data) => {
            dispatch(password2Change(data));
          }
        }
        ))(Register);