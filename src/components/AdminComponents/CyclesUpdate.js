import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import '../../style.css';
import '../../importStyle.css';


export default class CyclesUpdate extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            cycleID: 0,
            gamesIDs: [],
            cycleOrderInLeague: 0,
            isLocked: true,
            isClosed: true,
            membersScores: [],
            gamesDB: [],
            table: [{gameid: 1, hometeam: 'await', awayteam: 'await', score: 'await', cycleid: 0}],
            gamesToAdd: 0,
            hometeam: [""],
            awayteam: [""],
        }
    }

    cycleData = (url) => {
        fetch(url,
            {
                method: "get",
                dataType: 'json',
            })
            .then((res) => res.json())
            .then((data) => {
                let result = data;
                this.setState({
                    cycleID: result.cycleid,
                    gamesIDs: result.gamesids,
                    cycleOrderInLeague: result.cycleorderinleague,
                    isLocked: result.islocked,
                    isClosed: result.isclosed,
                    membersScores: result.membersscores,
                    gamesDB: result.gamesDB,
                });
                console.log("state admin cycle" , this.state)
            }).catch(err => console.log(err));
    }

    setTable = () => {
        let newTable = [{gameid: 1, hometeam: 'await', awayteam: 'await', score: 'await', cycleid: this.props.cycleID}];
        if (Array.isArray(this.state.gamesDB) && this.state.gamesDB.length > 0){
            newTable = this.state.gamesDB.map((game)=>{
                let score = game.score;
                if (this.state.isClosed && score === 3)
                    score = 'x';
                return {
                    hometeam: game.hometeam,
                    awayteam: game.awayteam,
                    score: score,
                    newScore: game.score,
                    cycleid: game.cycleid,
                    gameID: game.gameid,
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
        for (let i=0; i< this.state.gamesToAdd; i++){
            if (this.state.hometeam[i] !== '' && this.state.awayteam[i] !== ''){
                fetch('https://toto-server.herokuapp.com/addgame',
                    {
                        method: "post",
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            hometeam: this.state.hometeam[i],
                            awayteam: this.state.awayteam[i],
                            cycleID: this.state.cycleID,
                            leagueID: this.props.data.leagueID,
                            leagueSize: this.props.data.membersIDs.length,
                            firstGame: (this.state.table[0].hometeam === 'await'),
                        })
                    })
                    .then((res) => res.json())
                    .then((data) => {
                        this.props.onSubmit();
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
            console.log("response deletegame", data)
        }).catch(err => console.log("deletegame", err))
    }

    handleChange = (e, i) => {
        let newCycleScore = this.state.table;
        newCycleScore[i].newScore = e.target.value;
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
                this.props.onSubmit();
                }).catch(err => console.log("updatescores", err))
        }
    }


    render (){
        console.log("cycle update state", this.state);
        let url = `https://toto-server.herokuapp.com/home/cycle/${this.props.cycleID}`;
        if (parseInt(this.state.cycleID) !== parseInt(this.props.cycleID)){
            this.cycleData(url);
        }
        let tableArray = this.state.table;
        if (tableArray[0].cycleid !== this.state.cycleID && this.state.cycleID !== 0){
            this.setTable();
        }
        if (this.state.isClosed){
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
                                return( <tr key={i} >
                                            <td>{game.score}</td>
                                            <td>{game.awayteam}</td>
                                            <td>{game.hometeam}</td>
                                            <td>{i+1}</td>
                                        </tr>
                                );
                            })}                
                        </tbody>
                    </Table>
                </div>
            );
        } else if (this.state.isLocked) {
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
                                        );
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
                                        return( <tr key={i} >
                                                    <td><Button variant="outline-secondary" >delete</Button></td>
                                                    <td>{game.awayteam}</td>
                                                    <td>{game.hometeam}</td>
                                                    <td>{i+1}</td>
                                                </tr>
                                        );
                                })}
                                {gamesArray.map((x,i) => {
                                    return( <tr key={i} className="Hebrew" >
                                            <td> <Button style={{color: "black"}} type="button"
                                                            onClick={()=> this.setState({gamesToAdd: this.state.gamesToAdd+1,
                                                                                        hometeam: this.state.hometeam.concat([""]), awayteam: this.state.awayteam.concat([""])})} >
                                                + </Button> </td>
                                            <td><Form.Group>
                                                <Form.Control type="text" placeholder="קבוצת חוץ" onChange={(e) => {this.handleGamesInput(e,i,2)}}
                                                                                        value={this.state.awayteam[i]} />
                                            </Form.Group></td>
                                            <td><Form.Group>
                                                <Form.Control type="text" placeholder="קבוצת בית" onChange={(e) => {this.handleGamesInput(e,i,1)}}
                                                                                        value={this.state.hometeam[i]} />
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