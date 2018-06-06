/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import Counter from './Counter';
import axios from 'axios';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
   constructor(props){
	   super(props);
	   this.state = {answer: []};
   }
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }
  sendToServer(){
  axios.post('http://localhost:3001/update-table').then((response)=>{
    this.setState({answer: response.data})
}).catch(function (error) {
    console.log(error);
  });}
  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };
	console.log(this.state.answer);
    return (
	
	<div>

		<h1>Hello World!</h1>
		 <Counter />
    <button onClick={this.sendToServer.bind(this)}>ToServer</button>
    <ul>
    </ul>
	</div>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};
