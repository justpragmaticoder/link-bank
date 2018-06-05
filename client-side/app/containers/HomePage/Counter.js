import React from 'react';
import { connect } from 'react-redux';
class Counter extends React.Component {
  constructor(props){
    super(props);
    this.state = { counter: 0};
  }
  addCounter(){
    this.setState({counter: this.state.counter + 1});
  }
  deductToCounter(){
    this.setState({counter: this.state.counter - 1});
  }
  render(){
    return (
      <div>
        <button onClick={this.addCounter.bind(this)}> + </button>
        <p> {this.state.counter} </p>
        <button onClick={this.deductToCounter.bind(this)}> - </button>
      </div>
    );
  };
}
export default connect(
  state => ({
    testState: state
  }),
  dispatch => ({})
)(Counter);
