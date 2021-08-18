import React from 'react';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Register from './components/pages/Register';
import './style.css';
import './importStyle.css';


export default class App extends React.Component  {
  constructor (props) {
    super(props);
    this.state = {
      userID: 0,

    }
  }
  
  render(){
    if (this.state.userID !== 0){
      return (
        <Home
          userID={this.state.userID} 
          logOut={()=>{this.setState({userID:0})}}
        />
      );
    } else {
      return (
        <SignIn
          validLogin ={(userid) => {this.setState({userID: userid})}}
        />
      );
    }
  }
}
