import React from 'react';
import AdminNav from './AdminNav';
import * as Actions from './AdminActions';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../style.css';
import '../../importStyle.css';


export default class AdminCycle extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            cycleID: 0,
            gamesIDs: [],
            cycleOrderInLeague: 0,
            lockedForBets: false,
            lockedForUpdates: false,
            lockingTime: 0,
            gamesDB: [],
            table: [{gameid: 1, hometeam: 'await', awayteam: 'await', score: 'טרם נקבע', cycleid: 0}],
            gamesToAdd: 0,
            hometeam: [""],
            awayteam: [""],
            inputType: "lines",
        }
    }

    updateState = () => {
        let url = `https://toto-server.herokuapp.com/home/cycle/${this.props.cycleID}`;
        return fetch(url,
        {
                method: "get",
                headers: {'Content-Type': 'application/json'},
        }).then( res => res.json()
        ).then( data => {
            console.log("response cycle data", data);
            this.setState({
                cycleID: data.cycleid,
                gamesIDs: data.games_ids,
                cycleOrderInLeague: data.order_in_league,
                lockedForBets: data.lock_for_bets,
                lockedForUpdates: data.lock_for_updates,
                lockingTime: data.lock_bets_time,
                gamesDB: data.gamesDB,
            });
        }).catch(err => console.log("cycle data", err))       
    }

    setTable = () => {
        let newTable = [{gameid: 1, hometeam: 'await', awayteam: 'await', score: 'טרם נקבע', cycleid: this.state.cycleID}];
        if (Array.isArray(this.state.gamesDB) && this.state.gamesDB.length > 0){
            newTable = this.state.gamesDB.map((game)=>{
                let score = game.score;
                if (this.state.lockedForUpdates && score === 3)
                    score = 'x';
                return {
                    hometeam: game.home_team,
                    awayteam: game.away_team,
                    score: score,
                    newScore: game.score,
                    cycleid: game.cycleid,
                    gameID: game.gameid,
                    isbonus: game.is_bonus,
                };
            });
        }
        this.setState({table: newTable});
    }

    handleGamesInput = (e, i, teamType) => {
        if (teamType ===1){
            let hometeamArray = this.state.hometeam;
            hometeamArray[i] = e.target.value;
            this.setState({hometeam: hometeamArray}); 
        } else {
            let awayteamArray = this.state.awayteam;
            awayteamArray[i] = e.target.value;
            this.setState({awayteam: awayteamArray}); 
        }
    }

    handleChange = (e, i) => {
        let newCycleScore = this.state.table;
        newCycleScore[i].newScore = parseInt(e.target.value);
        console.log("newCycleScore", newCycleScore);
        this.setState({table: newCycleScore});
    }

    switchTab = (eventKey) => {
        switch(eventKey){
            case "switchInputType":
                if (this.state.inputType === "lines"){
                    this.setState({inputType: "text"});
                } else {
                    this.setState({inputType: "lines"});
                }
                break;
            case "LeagueData":
                this.props.goToLeaguePage();
                break;
            case "addCycle":
                let newCycleID = Actions.addCycle(this.props.leagueID);
                this.props.onSwitch(newCycleID);
                break;
            case "setLockBetsTime":
                break;
            case "lockBets":
                Actions.lockBets(this.state.cycleID);
                this.setState({lockedForBets: true});
                break;
            case "checkForMissingBets":
                break;
            case "unlockBets":
                Actions.unlockBets(this.state.cycleID);
                this.setState({lockedForBets: false});
                break;
            case "setAsCurrentCycle":
                Actions.setCurrentCycle(this.state.cycleID, this.props.leagueID);
                break;
            case "lockUpdates":
                Actions.lockUpdates(this.state.cycleID);
                this.setState({lockedForUpdates: true});
                break;
            case "ulockUpdates":
                Actions.unlockUpdates(this.state.cycleID);
                this.setState({lockedForUpdates: false});
                break;
            default:
                this.props.onSwitch(eventKey);
        }
    }



    render (){
        if (parseInt(this.state.cycleID) !== parseInt(this.props.cycleID)){
            this.updateState();
        }
        let tableArray = this.state.table;
        if (tableArray[0].cycleid !== this.state.cycleID && this.state.cycleID !== 0){
            this.setTable();
        }
        if (this.state.lockedForUpdates){
            return (
                <div>
                    <AdminNav   onSelect = { (eventKey) => {this.switchTab(eventKey)}}
                                cycles={this.props.cyclesIDs} 
                                cycleID = {this.state.cycleID}
                                tabMode = "lockedForUpdates"
                                inputType = {this.state.inputType}
                    />
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>תוצאה</th> 
                                <th>קבוצת חוץ</th> 
                                <th>קבוצת בית</th> 
                                <th>#</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {tableArray.map((game, i) => {
                                if (game.isbonus){
                                    return( <tr key={i} className="bonusLineFour" >
                                        <td>{game.score}</td>
                                        <td>{game.awayteam}</td>
                                        <td>{game.hometeam}</td>
                                        <td>{i+1}</td>
                                    </tr>
                                );} else {
                                    return( <tr key={i} >
                                        <td>{game.score}</td>
                                        <td>{game.awayteam}</td>
                                        <td>{game.hometeam}</td>
                                        <td>{i+1}</td>
                                    </tr>
                                );}
                            })}                
                        </tbody>
                    </Table>
                </div>
            )
        }
        else if (this.state.lockedForBets) {
            return (
                <div>
                    <AdminNav   onSelect = { (eventKey) => {this.switchTab(eventKey)}}
                                cycles={this.props.cyclesIDs} 
                                cycleID = {this.state.cycleID}
                                tabMode = "lockedForBets"
                                inputType = {this.state.inputType}
                    />
                    <Form onSubmit={()=>this.updateScores()}>
                        <Table striped bordered hover variant="dark" >
                            <thead>
                                <tr >
                                    <th>תוצאה</th> 
                                    <th>קבוצת חוץ</th> 
                                    <th>קבוצת בית</th> 
                                    <th>#</th> 
                                </tr>
                            </thead>
                            <tbody>
                                    {tableArray.map((game,i) => {
                                        if (game.isbonus){
                                            return( <tr key={i}  className="bonusLineFour" >
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control as="select" size="sm"  key={i} onChange={(e)=>this.handleChange(e, i)} value={game.newScore}>
                                                            <option value='0' >await</option>
                                                            <option value='1' >1</option>
                                                            <option value='2' >2</option>
                                                            <option value='3' >x</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>{game.awayteam}</td>
                                                <td>{game.hometeam}</td>
                                                <td>{i+1}</td>
                                            </tr>
                                        );} else {
                                            return( <tr key={i} >
                                                <td>
                                                    <Form.Group>
                                                        <Form.Control as="select" size="sm"  key={i} onChange={(e)=>this.handleChange(e, i)} value={game.newScore}>
                                                            <option value='0' >await</option>
                                                            <option value='1' >1</option>
                                                            <option value='2' >2</option>
                                                            <option value='3' >x</option>
                                                        </Form.Control>
                                                    </Form.Group>
                                                </td>
                                                <td>{game.awayteam}</td>
                                                <td>{game.hometeam}</td>
                                                <td>{i+1}</td>
                                            </tr>
                                        );}
                                    })}    
                            </tbody>
                            <Button style={{color: "black"}} type="button" onClick={()=>this.updateScores()} >update scores</Button>
                        </Table>
                    </Form>
                </div>
            )
        }
        else {
            let tabStatus = "openCycle";
            if (this.state.gamesDB === []){
                tabStatus = "emptyCylce";
            }
            let gamesArray = this.state.hometeam;
            return (
                <div>
                    <AdminNav   onSelect = { (eventKey) => {this.switchTab(eventKey)}}
                                cycles={this.props.cyclesIDs} 
                                cycleID = {this.state.cycleID}
                                tabMode = {tabStatus}
                                inputType = {this.state.inputType}
                    />
                    <Form onSubmit={()=>this.handleSubmit()}>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th></th> 
                                    <th>קבוצת חוץ</th> 
                                    <th>קבוצת בית</th> 
                                    <th>#</th> 
                                </tr>
                            </thead>
                            <tbody>
                                {tableArray.map((game,i) => {
                                    if (game.isbonus){
                                        return( <tr key={i}  className="bonusLineFour" >
                                            <td>
                                                <Button variant="outline-secondary" onClick={()=> this.deleteGame(game.gameID)}  >מחיקה</Button>
                                                <Button variant="outline-secondary"  onClick={()=> this.unmarkAsBonusGame(game.gameID)} >בטל סימון כבונוס</Button>
                                            </td>
                                            <td>{game.awayteam}</td>
                                            <td>{game.hometeam}</td>
                                            <td>{i+1}</td>
                                        </tr>
                                    );} else {
                                        return( <tr key={i} >
                                            <td>
                                                <Button variant="outline-secondary" onClick={()=> this.deleteGame(game.gameID)}  >מחיקה</Button>
                                                <Button variant="outline-secondary"  onClick={()=> this.markAsBonusGame(game.gameID)} >סמן כבונוס</Button>
                                            </td>
                                            <td>{game.awayteam}</td>
                                            <td>{game.hometeam}</td>
                                            <td>{i+1}</td>
                                        </tr>
                                    );}
                                })}
                                {gamesArray.map((x,i) => {
                                    return( <tr key={i} className="Hebrew" >
                                            <td> <Button style={{color: "black"}} type="button"
                                                            onClick={()=> this.setState({gamesToAdd: this.state.gamesToAdd+1,
                                                                                        hometeam: this.state.hometeam.concat([""]), awayteam: this.state.awayteam.concat([""])})} >
                                                + </Button> </td>
                                            <td><Form.Group>
                                                <Form.Control type="text" placeholder="קבוצת חוץ" onChange={(e) => {this.handleGamesInput(e,i,2)}}
                                                                                        value={this.state.awayteam[i]} autoComplete="true"  />
                                            </Form.Group></td>
                                            <td><Form.Group>
                                                <Form.Control type="text" placeholder="קבוצת בית" onChange={(e) => {this.handleGamesInput(e,i,1)}}
                                                                                        value={this.state.hometeam[i]} autoComplete="true" />
                                            </Form.Group></td>
                                            <td>*</td>
                                        </tr>
                                    );
                                })}    
                            </tbody>
                            <Button style={{color: "black"}} type="button" onClick={()=>this.addGames()} >הוסף משחקים</Button>
                        </Table>
                    </Form>
                </div>
            );
        }
    }
}