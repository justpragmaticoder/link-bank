/* eslint-disable consistent-return,no-undef */
import React from 'react';
import { connect } from 'react-redux';
import {loadLoginForm, loadTablesAfterLogin, usernameChange, passwordChange} from 'actions/loginActions.js';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

// import { Button } from 'antd';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { createStore } from 'redux'
const FormItem = Form.Item;
const regArray= {
    'login': /^[a-zA-Z]+$/,
    'password': /^[a-zA-Z0-9]+$/,
}
const messageArray = {
    'allOk': (data) => {message.success(data)},
    'error': (data) => {message.error(data)},
    'ok':""
}
const success = (data) => {
    if (!qq) {
    message.success(data);
    }
    qq++;
  };
  
  const error = (data) => {
    message.error(data);
  };
  
  const warning = () => {
    message.warning('This is message of warning');
  };
  let magic = 0;
  let qq =0;
class Login extends React.Component {
    constructor(props) {
        super(props);

      }
      componentDidUpdate1(prevProps){
        //   console.log(this.props);
        // console.log('privet1111')

          if(this.props.loginForm.userId.token.length > 5 && magic){
            //   this.props.redirectToTables({id: this.props.loginForm.userId.id});
            //   this.props.history.push('/tables/'+this.props.loginForm.userId.id);
            console.log(this.props.loginForm.userId.id);
            magic = 0;
            this.props.redirectToTables({id: this.props.loginForm.userId.id});
            qq = this.props.loginForm.userId.id;
            
		  }
      }
      checkField = (data, text) => {
        if (data=='') {
            return {
                status: "error",
                data: `${text} is empty`
            }
        }
        if (!regArray[text].test(data)) {
            return {
                status: "error",
                data: `${text} must consist only of letters ${(text=='password')?"or digits":""}`
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
            data: "Login is successfull"
        }
      }
      handleUsernameChange(event){
        this.props.onUsernameChange({username:event.target.value});
      }
      handlePasswordChange(event){
        this.props.onPasswordChange({password:event.target.value});
      }
      handleClick = (e)=>{
        const loginField = this.props.loginForm.username;
        const passwordField = this.props.loginForm.password;
        let checkLogin = this.checkField(loginField, 'login');
        let checkPassword = this.checkField(passwordField, 'password');
        messageArray[checkLogin.status](checkLogin.data);
        messageArray[checkPassword.status](checkPassword.data);
        if (checkLogin.status == 'ok'){
            if (checkPassword.status == 'ok'){
                messageArray['allOk']('Login is successfull');
               this.props.onLoginFormLoad({login:loginField, password: passwordField});
                console.log(this.props.loginForm.userId.data.token);
                fetch("http://localhost:3001/tables/"+this.props.loginForm.userId.data.id,{
                    method: 'GET',
                    token: this.props.loginForm.userId.data,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'token': this.props.loginForm.userId.data.token
                      },
               
                }).then((response)=>console.log(response));  
            }
        }
      }
	  checkStatus(){
		  if(this.props.loginForm.userId.token.length > 5){
            //   this.props.redirectToTables({id: this.props.loginForm.userId.id});
              this.props.history.push('/'+this.props.loginForm.userId.id);
              console.log('privet1111')
		  }
	  }
      render() {
		//   console.log(this.props)
        //   this.checkStatus();
        console.log(this.state);
        return (
            
          <Form className="login-form">
            <p onClick={()=>{console.log(this.props)}}>Login form</p>
            <FormItem>
                <Input 
                id="loginField" 
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                placeholder="Username" 
                onChange = {this.handleUsernameChange.bind(this)}
                />
            </FormItem>
            <FormItem>
                <Input 
                id="passField" 
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                type="password"
                placeholder="Password" 
                onChange = {this.handlePasswordChange.bind(this)}
                />
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
          loginForm: state.get('login').toJS(),
        //   user: state.get('user').toJS()
        }),
        (dispatch) => ({
          onLoginFormLoad: (data) => {
            let x = dispatch(loadLoginForm(data));
            console.log(x);
          },
          redirectToTables: (data)=>{
              dispatch(loadTablesAfterLogin(data));
          },
          onUsernameChange: (data) => {
              dispatch(usernameChange(data));
          },
          onPasswordChange: (data) => {
            dispatch(passwordChange(data));
        }
        }
        ))(Login);