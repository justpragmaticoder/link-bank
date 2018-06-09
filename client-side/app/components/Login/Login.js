/* eslint-disable consistent-return,no-undef */
import React from 'react';
import { connect } from 'react-redux';
import loadForms from 'actions/loginActions.js';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

// import { Button } from 'antd';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        // console.log(loadTables);
      }
      handleClick = ()=>{
          console.log('qq');
      }
      render() {
        return (
          <Form className="login-form">
            <FormItem>
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            </FormItem>
            <FormItem>
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            </FormItem>
            <FormItem>
                <Checkbox>Remember me</Checkbox>
              <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.props.sendForm.bind(this)}>
                Log in
              </Button>
              Or <a href="">register now!</a>
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
          sendForm: () => {
            dispatch(loadForms('privet'));
          }
        }
        ))(Login);