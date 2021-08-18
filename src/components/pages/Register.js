import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../style.css';
import '../../importStyle.css';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newUsername: '',
            newPublicName: '',
            newPassword: '',
            passwordAgain: '',
            badSubmition: false,
        };
    }
    onUsernameChange = (event) => {
        this.setState({newUsername: event.target.value});
    }
    onPublicNameChange = (event) => {
        this.setState({newPublicName: event.target.value});
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
                    username: this.state.newUsername,
                    publicName: this.state.newPublicName,
                    password: this.state.newPassword
                })
            }).then((res) => res.json())
            .then( data => {
                let user = parseInt(data);
                console.log("register", user);
                this.props.validLogin(user);
            }).catch(err => console.log('register', err))
        }
    }
    

    render (){
        
        return (
            <div>
                <Form className="registerForm">
                    <Form.Group>
                        <Form.Label>שם משתמש</Form.Label>
                        <Form.Control type="text" placeholder="שם משתמש" onChange={this.onUsernameChange}    />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>שם פרופיל (פומבי)</Form.Label>
                        <Form.Control type="text" placeholder="שם משתמש פומבי"  onChange={this.onPublicNameChange}    />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>סיסמא</Form.Label>
                        <Form.Control type="password" placeholder="Password"  onChange={this.onPasswordChange}    />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>סיסמא (שוב)</Form.Label>
                        <Form.Control type="password" placeholder="Password (again)"   onChange={this.onPasswordAgainChange}  />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit"
                                onClick = {(e)=> {
                                    e.preventDefault();
                                    this.onSubmitRegister();
                                }}>
                            הירשם
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}