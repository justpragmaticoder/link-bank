import {connect} from 'react-redux';
import React from 'react';
import {Button} from 'antd';
import {makeUserLogout} from 'actions/loginActions.js';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  getUserName() {
    return this.props.userId.login;
  }

  render() {
    const mainDivStyle = {
      width: '100px',
      height: '100px',
      position: 'absolute',
      top: 0,
      right: 0,
      margin: '20px 20px 10px 10px'
    };

    return (
      <div style={mainDivStyle}>
        <div style={{marginBottom: '5px'}}>Username: {this.getUserName}</div>
        <Button type="primary" htmlType="submit" onClick={this.props.makeLogout()}>Logout</Button>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    userId: state.get('userId').toJS(),

  }),
  (dispatch) => ({
      makeLogout: () => {
        dispatch(makeUserLogout())
      }
    }
  ))(Header);
