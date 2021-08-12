import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../style.css';
import '../../importStyle.css';

export default class Join extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leagueName: '',
            leagueID: 0,
            badSubmition: false,
        };
    }
    onLeagueNameChange = (event) => {
        this.setState({leagueName: event.target.value});
    }
    onLeagueIdChange = (event) => {
        this.setState({leagueID: event.target.value});
    }

    JoinLeague = () => {
        fetch('https://toto-server.herokuapp.com/joinLeague' , {
            method: "post",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                leagueName: this.state.leagueName,
                leagueID: this.state.leagueID,
                userID: this.props.userID,
                userName: this.props.username,
            })
        }).then( (res) => res.json())
        .then( data => {
            let leagueID = data[data.length-1];
            console.log("join league", leagueID);
            this.props.onJoining(leagueID);
        }).catch(err => console.log('join', err))
    }
    render (){
        let createLeague = <></>;
        if (this.props.isAdmin === 0){
            createLeague = <Form.Group>
            OR... &nbsp;&nbsp;&nbsp;
                                <Button variant="primary" type="submit" 
                                    onClick = {(e)=> {
                                        e.preventDefault();
                                        this.props.createLeague()}} >
                                    Create new League as Admin
                                </Button>
                            </Form.Group>
        }
        return (
            <div>
                <Form className="joinForm">
                    <Form.Group controlId="text">
                        <Form.Label>League Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter league name" 
                                        onChange={this.onLeagueNameChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="text">
                        <Form.Label>League ID</Form.Label>
                        <Form.Control type="text" placeholder="Enter league ID number" 
                                        onChange={this.onLeagueIdChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit" size="lg"
                            onClick = {()=> this.JoinLeague()}>
                            Join League
                        </Button>
                    </Form.Group>
                    {createLeague}
                </Form>
            </div>
        );
    }
}