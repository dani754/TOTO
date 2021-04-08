import React from 'react';
import SignInForm from './pages/SignInForm';
import Register from './pages/Register';
import Nav from 'react-bootstrap/Nav';
import '../style.css';
import '../importStyle.css';


export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            register: false,
            language: this.props.language,
            userID: 0,
        };
    }

    eventsHandler = (eventKey) => {
        switch(eventKey){
            case "english":
            case "hebrew":
                this.props.changeLanguage(eventKey);
                this.setState({language: eventKey});
                break;
            case "register":
                this.setState({register: true});
                break;
            case "login":
            case "about":
                this.setState({register: false});
                break;
            default:
                this.setState({register: false});
        }
    }

    render () {
        let Content = <SignInForm onRegistration={(user)=> this.setState({userID: user})}
                                  language = {this.state.language} />
        if (this.state.register){
            Content = <Register   onRegistration = {(user)=> this.setState({userID: user})}
                                  language = {this.state.language} /> 
        }
        if (this.state.userID !== 0){
            this.props.validLogin(parseInt(this.state.userID));
        }
        let about = 'About';
        let register = 'Register';
        let login = 'Log In';
        let pageDesign = "signinPage English"
        if (this.state.language === 'hebrew'){
            about = 'אודות';
            register = 'הרשמה';
            login = 'כניסה לחשבון';
            pageDesign = "signinPage Hebrew"
        }
        return (
            <div className={pageDesign} >
                <Nav onSelect={(eventKey) => this.eventsHandler(eventKey)} >
                    <Nav.Item>
                        <Nav.Link eventKey="english" >English</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="hebrew"  >עברית</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="about"  >{about}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="register" >{register} </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="login" >{login}</Nav.Link>
                    </Nav.Item>
                </Nav>
                <div></div>
                {Content}
                <div></div>
            </div>
        );   
    }
}
