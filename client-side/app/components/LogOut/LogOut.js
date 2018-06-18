import { connect } from "react-redux";
import React from "react";
import { Form, Input, Button, Icon } from "antd";

class LogOut extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.login.userId.login);
    return (
      <div>
        <p></p>
      </div>
    );
  }
}
export default connect(
  state => ({
    login: state.get("login").toJS()
  }),
  dispatch => ({})
)(LogOut);
