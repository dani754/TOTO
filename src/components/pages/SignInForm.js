import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../style.css';
import '../../importStyle.css';

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            badSubmition: false,
        };
    }
    onUsernameChange = (event) => {
        this.setState({username: event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value});
    }

    onSubmitSignin = () => {
        if (this.state.signinEmail !== ''){
            return fetch('https://toto-server.herokuapp.com/signin' , {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            }).then((res) => res.json())
            .then( data => {
                let user = parseInt(data);
                console.log("signin", user);
                this.props.loginIn(user);
        }).catch(err => console.log('signin', err))
        }
    }
    
    render () {
        return (
            <div>
                <Form className="signinForm">
                    <Form.Group>
                        <Form.Label>שם משתמש</Form.Label>
                        <p></p>
                        <Form.Control type="text" placeholder="שם משתמש" autoComplete="username"  onChange={this.onUsernameChange} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>סיסמא</Form.Label>
                        <p></p>
                        <Form.Control type="password" placeholder="סיסמא" autoComplete="current-password"  onChange={this.onPasswordChange}  />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit" 
                                onClick = {(e)=> {
                                    e.preventDefault();
                                    this.onSubmitSignin();
                                }}>
                        התחברות
                        </Button>      
                    </Form.Group>           
                </Form>  
            </div>
        );    
    }
}