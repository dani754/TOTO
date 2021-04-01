import React from 'react';
import Home from './components/Home';
import SignIn from './components/SignIn';
import './style.css';
import './importStyle.css';


export default class App extends React.Component  {
  constructor (props) {
    super(props);
    this.state = {
      userID: 0,
      language: 'english',

    }
  }
  
  render(){
    if (this.state.userID !== 0){
      return (
        <Home
          user={this.state.userID} 
          logOut={()=>{this.setState({userID:0})}}
          language = {this.state.language}
        />
      );
    } else {
      return (
        <SignIn
          validLogin ={(userid) => {this.setState({userID: userid})}}
          changeLanguage = {(update)=>{this.setState({language: update})}}
        />
      );
    }
  }
}
