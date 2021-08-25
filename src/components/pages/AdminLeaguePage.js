import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import * as Actions from './AdminActions';
import '../../style.css';
import '../../importStyle.css';

export default class AdminLeaguePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            changeLeagueName: false,
            currentLeagueName: this.props.leagueName,
            newLeagueName: '',
            currentCycle: this.props.currentCycle,
        }
    }

    onLeagueNameChange = (e) => {
        this.setState({newLeagueName: e.target.value})
    }

    changeLeagueName = () => {
        console.log("activate changeLeagueName", this.state)
        if (this.state.newLeagueName !== '' && this.state.newLeagueName !== this.state.currentLeagueName){
            fetch('https://toto-server.herokuapp.com/changeleaguename',
                {
                    method: "post",
                    dataType: "json",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        leagueID: this.props.leagueID,
                        newLeagueName: this.state.newLeagueName
                    }),
            }).then( res => res.json()
            ).then ( answer => {
                let result = answer;
                console.log("change league name", result);
                this.setState({
                    changeLeagueName: false,
                    currentLeagueName: this.state.newLeagueName,
                })
            }).catch(err => console.log('AdminPage', err))
        }
    }

    handleChange = (e) => {
        this.setState({currentCycle: e.target.value});
    }

    render (){

        let leagueNameProp = <Col><Form.Label className="Hebrew"  >שם הליגה:      {this.state.currentLeagueName} </Form.Label></Col>
        if (this.state.changeLeagueName){
            leagueNameProp =   <><Col><Button onClick={()=>this.changeLeagueName()} > עדכן </Button></Col>
                                <Col><Form.Control className="Hebrew" placeholder={this.state.currentLeagueName} onChange={(e)=>this.onLeagueNameChange(e)} /></Col></>
        }
        let cycles = this.props.cyclesIDs;
        cycles.sort(function(a, b){return a-b});
        return (
            <div>
                <Form>
                    <Form.Group>
                        <Form.Label >פרטים כללים</Form.Label>
                        <Row>
                            <Col>
                                <Button onClick={()=>this.setState({changeLeagueName: true})} size="sm" > שנה שם ליגה</Button>
                            </Col>
                            <Col>   
                                <Form.Label className="Hebrew" >מספר הליגה:   {this.props.leagueID} </Form.Label>
                            </Col>
                            {leagueNameProp}
                        </Row>
                        <p></p>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Button onClick={()=>Actions.setCurrentCycle(this.state.currentCycle, this.props.leagueID)} size="sm" >עדכן</Button>
                            </Col>
                            <Col>
                                <Form.Control as="select" size="sm" value={this.state.currentCycle} onChange={(e)=>this.handleChange(e)} >
                                    {
                                        cycles.map( (cycle, i) => {
                                            return (
                                                <option key={i} value={cycle}>{i+1}</option>
                                            );
                                        })
                                    }
                                </Form.Control>
                            </Col>
                            <Col>   
                                <Form.Label>עדכון מחזור להצגה בטבלת הליגה  </Form.Label>
                            </Col>
                        </Row>
                        <p></p>
                    </Form.Group>
                    <Form.Group><Row>
                    <Col>
                            <Form.Label>רשימת משתתפים</Form.Label>
                            <Table striped bordered hover variant="dark" >
                                <thead>
                                    <tr className="adminPageNamesTable" >
                                        <th>סטטוס</th>
                                        <th>שם</th> 
                                        <th>#</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.membersNames.map( (member, i) => {
                                            return (
                                                <tr key={i} className="adminPageNamesTable" >
                                                    <td>פעיל</td>
                                                    <td>{member}</td>
                                                    <td>{i+1}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <Form.Label>רשימת מחזורים</Form.Label>
                            <Table striped bordered hover variant="dark">
                            <thead>
                                    <tr className="adminPageCycleTable" >
                                        <th>סטטוס</th>
                                        <th>#</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.cyclesIDs.map( (cycle, i) => {
                                            return (
                                                <tr key={i} className="adminPageCycleTable" >
                                                    <td>פעיל</td>
                                                    <td>{i+1}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </Table>
                        </Col>
                    </Row></Form.Group>
                </Form>
            </div>
        );
    }
}