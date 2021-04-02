import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../style.css';
import '../../importStyle.css';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newEmail: '',
            newUserName: '',
            newPassword: '',
            passwordAgain: '',
            badSubmition: false,
        };
    }
    onEmailChange = (event) => {
        this.setState({newEmail: event.target.value});
    }
    onUsernameChange = (event) => {
        this.setState({newUserName: event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({newPassword: event.target.value});
    }
    onPasswordAgainChange = (event) => {
        this.setState({passwordAgain: event.target.value});
    }


    onSubmitRegister = () => {
        if (this.state.newPassword === this.state.passwordAgain){
            fetch('https://toto-server.herokuapp.com/register' , {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.newEmail,
                    username: this.state.newUserName,
                    password: this.state.newPassword
                })
            }).then((res) => res.json())
            .then( data => {
                let user = parseInt(data);
                console.log("register", user);
                this.props.onRegistration(user);
            }).catch(err => console.log('register', err))
        }
    }
    

    render (){
        let email="Email address";
        let username = "User Name";
        let password="Password";
        let rePassword="Please re-enter Password";
        let submit = "Register";
        if (this.props.language === "hebrew"){
            email="כתובת אימייל";
            username="שם משתמש (ציבורי)";
            password="סיסמא";
            rePassword="הזנת הסיסמא בשנית";
            submit = "הרשמה";
        }
        return (
            <div>
                <Form className="registerForm">
                    <Form.Group>
                        <Form.Label>{email}</Form.Label>
                        <Form.Control type="text" placeholder="Enter email" autocomplete="username"
                                        onChange={this.onEmailChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formUsername">
                        <Form.Label>{username}</Form.Label>
                        <Form.Control type="text" placeholder="Enter a unique user name (public)" autocomplete="username"
                                        onChange={this.onUsernameChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>{password}</Form.Label>
                        <Form.Control type="password" placeholder="Password" autocomplete="new-password"
                                        onChange={this.onPasswordChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>{rePassword}</Form.Label>
                        <Form.Control type="password" placeholder="Password (again)" autocomplete="new-password"
                                        onChange={this.onPasswordAgainChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit"
                                            onClick= {()=> this.onSubmitRegister()}>
                            {submit}
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}