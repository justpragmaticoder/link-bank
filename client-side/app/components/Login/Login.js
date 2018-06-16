/* eslint-disable consistent-return,no-undef */
import React from 'react';
import { connect } from 'react-redux';
import {loadTables, loadLinks, resizeTable, positionTable, deleteLink, deleteTable, update} from 'actions/index.js';
import {loadLoginForm, loadTablesAfterLogin} from 'actions/loginActions.js';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

// import { Button } from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { createStore } from 'redux'
const FormItem = Form.Item;
const regArray= {
    'login': /^[a-zA-Z]+$/,
    'password': /^[a-zA-Z0-9]+$/,
}
class Login extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
      }

      checkField = (data, text) => {
        if (data.length == 0) {
            return {
                status: "error",
                data: `${text} is empty`
            }
        }
        if (!regArray[text].test(data)) {
            return {
                status: "error",
                data: `${text} must consist only of letters`+(text=='password')?"or digits":""
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
      handleClick = (e)=>{
        const loginField = document.querySelectorAll('#loginField')[0].value;
        const passwordField = document.querySelectorAll('#passField')[0].value;
        // console.log(this.checkField(loginField,'login'));
        let checkLogin = this.checkField(loginField, 'login');
        // if (checkLogin.status == 'ok' && checkPassword.status == 'ok'){
        //     this.props.history.push('/');
        // }
        // else {

        // }
        // console.log(loginField);
       this.props.onLoginFormLoad({login:loginField, password: passwordField});
    //   this.props.onLoginFormLoad({login:loginField, password: passwordField});

        //this.setState({'redux': "huinya"});
        //console.log(this.state['redux']);
        // this.history.push('/'+thi);
        console.log(`fsdf`+this.props.loginForm.userId.id);
      }
	  checkStatus(){
		  if(this.props.loginForm.userId.token.length > 5 && this.props.loginForm.userId.id >= 0){
		    this.props.loadTables();
        this.props.loadLinks();
			  this.props.history.push('/');
		  }
	  }
      render() {
		  console.log(this.props)
		  this.checkStatus();
        return (

          <Form className="login-form">
            <p>Login form</p>
            <FormItem>
                <Input id="loginField" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            </FormItem>
            <FormItem>
                <Input id="passField" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            </FormItem>
            <FormItem>
                <Checkbox>Remember me</Checkbox>
              <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleClick.bind(this)}>
                Log in
              </Button>
              Or <a href="/register">register now!</a>
            </FormItem>

          </Form>
        );
      }
    }

    export default connect(
        (state) => ({
          loginForm: state.get('login').toJS()
        }),
        (dispatch) => ({
          onLoginFormLoad: (data) => {
            dispatch(loadLoginForm(data));
          },
          loadTables: (data)=>{
              dispatch(loadTables());
          },
          loadLinks: (data)=>{
            dispatch(loadLinks());
          },

        }
        ))(Login);
