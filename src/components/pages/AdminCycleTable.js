import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AdminNav from './AdminNav';
import * as Actions from './AdminActions';
import '../../style.css';
import '../../importStyle.css';


export default class AdminCycleTable extends React.Component {
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
        }
    }

    updateState = () => {
        let cycleData = Actions.getCycleData(this.props.cycleID);
        this.setState({
            cycleID: cycleData.cycleid,
            gamesIDs: cycleData.games_ids,
            cycleOrderInLeague: cycleData.order_in_league,
            lockedForBets: cycleData.lock_for_bets,
            lockedForUpdates: cycleData.lock_for_updates,
            lockingTime: cycleData.lock_bets_time,
            gamesDB: cycleData.gamesDB,
        })
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

    addGames = () => {
        for (let i=0; i<= this.state.gamesToAdd; i++){
            if (this.state.hometeam[i] !== '' && this.state.awayteam[i] !== ''){
                fetch('https://toto-server.herokuapp.com/addgame',
                    {
                        method: "post",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            hometeam: this.state.hometeam[i],
                            awayteam: this.state.awayteam[i],
                            cycleID: this.state.cycleID,
                            leagueSize: this.props.leagueSize,
                            isFirst: (this.state.table[0].hometeam === 'await'),
                        })
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        if (i===this.state.gamesToAdd){
                            let renderUpdateTable = this.state.table;
                            renderUpdateTable[0].cycleid = 0;
                            this.setState({
                                cycleID: 0,
                                gamesToAdd: 0,
                                hometeam: [""],
                                awayteam: [""],
                                table: renderUpdateTable,
                            })                            
                        }
                    }).catch(err => console.log("addGame", err))
            }
            
        }
    }
    
    deleteGame = (gameID) => {
        console.log("delete game", gameID);
        let url = `https://toto-server.herokuapp.com/deletegame/${gameID}`;
        fetch(url,
        {
                method: "get",
                headers: {'Content-Type': 'application/json'},
        }).then((res) => {
            console.log("response deletegame", res)
            res.json()
        }).then((data) => {
            let renderUpdateTable = this.state.table;
            renderUpdateTable[0].cycleid = 0;
            this.setState({
                cycleID: 0,
                table: renderUpdateTable,
            })   
            console.log("response deletegame", data)
        }).catch(err => console.log("deletegame", err))
    }

    markAsBonusGame = (gameID) => {
        console.log("bunus game", gameID);
        let url = `https://toto-server.herokuapp.com/bonusgame/${gameID}`;
        fetch(url,
        {
                method: "get",
                headers: {'Content-Type': 'application/json'},
        }).then((res) => {
            console.log("response bonusgame", res)
            res.json()
        }).then((data) => {
            let renderUpdateTable = this.state.table;
            renderUpdateTable[0].cycleid = 0;
            this.setState({
                cycleID: 0,
                table: renderUpdateTable,
            }) 
            console.log("response bonusgame", data)
        }).catch(err => console.log("bonusgame", err))
    }

    unmarkAsBonusGame = (gameID) => {
        console.log("un-bunus game", gameID);
        let url = `https://toto-server.herokuapp.com/unbonusgame/${gameID}`;
        fetch(url,
        {
                method: "get",
                headers: {'Content-Type': 'application/json'},
        }).then((res) => {
            console.log("response unbonusgame", res)
            res.json()
        }).then((data) => {
            let renderUpdateTable = this.state.table;
            renderUpdateTable[0].cycleid = 0;
            this.setState({
                cycleID: 0,
                table: renderUpdateTable,
            }) 
            console.log("response unbonusgame", data)
        }).catch(err => console.log("unbonusgame", err))
    }

    handleChange = (e, i) => {
        let newCycleScore = this.state.table;
        newCycleScore[i].newScore = parseInt(e.target.value);
        console.log("newCycleScore", newCycleScore);
        this.setState({table: newCycleScore});
    }

    updateScores = () => {
        console.log("updateScores", this.state);
        if (this.state.table[0].cycleid === this.state.cycleID && Array.isArray(this.state.gamesDB) && this.state.gamesDB.length > 0){
            fetch('https://toto-server.herokuapp.com/updatescores',
                {
                    method: "post",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        gamesTable: this.state.table,
                        cycleID: this.state.cycleID,
                    })
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log("response updatescores", data);
                    this.props.onSelect("scoreUpdate");
                    this.setState({cycleID: 0});
                }).catch(err => console.log("updatescores", err))
        }
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
                this.setState({leaguePage: true});
                break;
            case "addCycle":
                let newCycleID = Actions.addCycle(this.state.leagueID);
                let newCyclesIDsArray = this.state.cyclesIDs;
                newCyclesIDsArray.push(newCycleID);
                this.setState({showCycle: newCycleID,
                                gamesDB: [],
                                showCycleData: {cycleid: newCycleID},
                                cyclesIDs: newCyclesIDsArray,
                });
                break;
            case "setLockBetsTime":
                break;
            case "lockBets":
                Actions.lockBets(this.state.showCycle);
                let lockBetsState = this.state.showCycleData;
                lockBetsState.lock_for_bets = true;
                this.setState({showCycleData: lockBetsState});
                break;
            case "checkForMissingBets":
                break;
            case "unlockBets":
                Actions.unlockBets(this.state.showCycle);
                let unlockBetsState = this.state.showCycleData;
                unlockBetsState.lock_for_bets = false;
                this.setState({showCycleData: unlockBetsState});
                break;
            case "setCurrentCycle":
                let cycle = this.state.showCycle;
                Actions.setCurrentCycle(cycle, this.state.leagueID);
                this.setState({currentCycle: cycle});
                break;
            case "lockUpdates":
                Actions.lockUpdates(this.state.showCycle);
                let lockUpdatesState = this.state.showCycleData;
                lockUpdatesState.lock_for_updates = true;
                this.setState({showCycleData: lockUpdatesState});
                break;
            case "ulockUpdates":
                Actions.unlockUpdates(this.state.showCycle);
                let unlockUpdatesState = this.state.showCycleData;
                unlockUpdatesState.lock_for_updates = false;
                this.setState({showCycleData: unlockUpdatesState});
                break;
            default:
                this.setState({showCycle: eventKey});
                this.getShowCycleData();
        }
    }



    render (){
        if (this.state.cycleID !== this.props.cycleID){
            this.updateState();
        }
        let tableArray = this.state.table;
        if (tableArray[0].cycleid !== this.state.cycleID && this.state.cycleID !== 0){
            this.setTable();
        }
        if (this.state.lockedForUpdates){
            return(
                <div>
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
            );
        } else if (this.state.lockedForBets) {
            return (
                <div>
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
            );
        } else {
            let gamesArray = this.state.hometeam;
            return (
                <div>
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