import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../style.css';
import '../../importStyle.css';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signinEmail: '',
            signinPassword: '',
            badSubmition: false,
        };
    }
    onEmailChange = (event) => {
        this.setState({signinEmail: event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({signinPassword: event.target.value});
    }

    onSubmitSignin = () => {
        if (this.state.signinEmail !== ''){
            return fetch('https://toto-server.herokuapp.com/signin' , {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.signinEmail,
                    password: this.state.signinPassword
                })
            }).then((res) => res.json())
            .then( data => {
                let user = parseInt(data);
                console.log("signin", user);
                this.props.onRegistration(user);
        }).catch(err => console.log('signin', err))
        }
    }
    
    render () {
        let email="Email address";
        let password="Password";
        let submit = "Log In";
        if (this.props.language === "hebrew"){
            email="כתובת אימייל";
            password="סיסמא";
            submit = "התחברות";
        }
        return (
            <div>
                <Form className="signinForm">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>{email}</Form.Label>
                        <p></p>
                        <Form.Control type="text" placeholder="Enter email" 
                                        onChange={this.onEmailChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>{password}</Form.Label>
                        <p></p>
                        <Form.Control type="password" placeholder="Password" 
                                        onChange={this.onPasswordChange}  />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit" 
                                onClick = {(e)=> {
                                    e.preventDefault();
                                    this.onSubmitSignin();
                                }}>
                        {submit}
                        </Button>      
                    </Form.Group>           
                </Form>  
            </div>
        );    
    }
}