import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../style.css';
import '../../importStyle.css';

export default class createLeague extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leagueName: '',
            scoringMethod: 1,
            badSubmition: false,
        };
    }
    onNameChange = (event) => {
        this.setState({leagueName: event.target.value});
    }
    onScoreMethodChange = (event) => {
        this.setState({scoringMethod: event.target.value});
    }

    onSubmition = () => {
        console.log("create league", this.state);
        if (this.state.leagueName !== ''){
            fetch('https://toto-server.herokuapp.com/createleague' , {
                method: "post",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    leagueName: this.state.leagueName,
                    scoringMethod: this.state.scoringMethod,
                    userID: this.props.userID,
                    userName: this.props.userName,
                })
            }).then((res) => {
                console.log(res);
                res.json()
            })
            .then( data => {
                console.log("new league", data);
                this.props.newLeague();
            }).catch(err => console.log('create league', err))
        }
    }
    
    render () {
        let leagueName="League Name";
        let scoreMethod="Scoring method";
        let submit = "Create new league as admin";
        if (this.props.language === "hebrew"){
            leagueName="שם הליגה";
            scoreMethod="שיטת ניקוד";
            submit = "צור ליגה חדשה כמנהל ליגה";
        }
        console.log("inside create league", this.state)
        return (
            <div className="Hebrew" >
                <p></p>
                <Form className="registerForm">
                    <Form.Group>
                        <Form.Label>{leagueName}</Form.Label>
                        <p></p>
                        <Form.Control type="text" placeholder={leagueName} 
                                        onChange={this.onNameChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{scoreMethod}</Form.Label>
                        <p></p>
                        <Form.Control as="select" size="sm" onChange={(e)=>this.onScoreMethodChange(e)} value={this.state.scoringMethod}>
                            <option value='1' > (2, x, 1) השיטה הבסיסית - נקודה לכל ניחוש נכון בטופס </option>
                            <option value='2' >השיטה הבסיסית עם משחקי בונוס (2 נק')</option>
                            <option value='2' >שיטת היורו (בקרוב)</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button type="submit" 
                                onClick = {(e)=> {
                                    this.onSubmition();
                                }}>
                        {submit}
                        </Button>      
                    </Form.Group>           
                </Form>  
            </div>
        );    
    }
}