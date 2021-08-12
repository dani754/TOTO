import React from 'react';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../style.css';
import '../../importStyle.css';

export default class Cycle extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            cycleID: 0,
            gamesIDs: [],
            cycleOrderInLeague: 0,
            isLocked: true,
            membersScores: [],
            gamesDB: [],
            table: [{gameid: 1, hometeam: 'await', awayteam: 'await', score: 'await', cycleid: 0, userBet: 0, bets: [0,]}],
            userIndex: 0,
        }
    }


    cycleData = () => {
        let membersArray = this.props.membersIDs;
        let findUserIndexInLeague = membersArray.indexOf(this.props.userID);
        fetch(`https://toto-server.herokuapp.com/home/cycle/${this.props.cycleID}`,
            {
                method: "get",
                dataType: 'json',
            })
            .then((res) => res.json())
            .then((data) => {
                let result = data;
                this.setState({
                    cycleID: result.cycleid,
                    gamesIDs: result.games_ids,
                    cycleOrderInLeague: result.order_in_league,
                    isLocked: result.lock_for_bets,
                    membersScores: result.members_scores_cycle,
                    gamesDB: result.gamesDB,
                    userIndex: findUserIndexInLeague,
                });
                console.log("state cycle" , this.state)
            }).catch(err => console.log(err));
    }

    setTable = () => {
        let newTable = [{gameid: 1, hometeam: 'await', awayteam: 'await', score: 'await', userBet: 'await',  cycleid: parseInt(this.props.cycleID), bets: [0,]}];
        if (Array.isArray(this.state.gamesDB) && this.state.gamesDB.length > 0){
            newTable = this.state.gamesDB.map((game)=>{
                let scoreUpdate = 'טרם נקבע';
                if (this.state.isLocked && game.score > 0){
                    if (game.score === 3)
                        scoreUpdate = 'x';
                    else
                        scoreUpdate = game.score;
                }
                let bet = game.members_bets[this.state.userIndex];
                if (this.state.isLocked && bet === 3)
                    bet = 'x';
                let bonusMark = '';
                if (game.is_bonus)
                    bonusMark = 'בונוס! ';
                return {
                    hometeam: game.home_team,
                    awayteam: game.away_team,
                    score: scoreUpdate,
                    userBet: bet,
                    cycleid: game.cycleid,
                    gameID: game.gameid,
                    bonus: bonusMark,
                    isbonus: game.is_bonus,
                    bets: game.members_bets,
                };
            });
        }
        this.setState({table: newTable});
        console.log("new table", this.state.table)
    }

    handleChange = (e, i) => {
        let newCycleBet = this.state.table;
        newCycleBet[i].userBet = e.target.value;
        this.setState({table: newCycleBet});
    }

    checkBets = (table) => {
        let complete = true;
        for (let i = 0; i<table.length; i++){
            if (! (table[i].userBet >= 1 && table[i].userBet <= 3 ||  table[i].userBet === 'x')){
                complete = false;
            }
        }
        this.props.showBetUpdatingToast(complete);
        this.setState({cycleID: 0});
    }

    handleSubmit = () => {
        if (this.state.table[0].cycleid === this.state.cycleID && Array.isArray(this.state.gamesDB) && this.state.gamesDB.length > 0){
            console.log("gamesTable",this.state.table,this.state.userIndex);
            return fetch('https://toto-server.herokuapp.com/updatebets',
                {
                    method: "post",
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({
                        userIndex: this.state.userIndex,
                        gamesTable: this.state.table,
                    })
            }).then((res) => {
                console.log("updatebets res", res);
                return res.json()
            })
            .then((data) => {
                console.log("updatebets", data);
                return this.checkBets(this.state.table);
            }).catch(err => console.log("updatebets", err))
        }
    }


    
    render (){
        if (parseInt(this.state.cycleID) !== parseInt(this.props.cycleID)){
            this.cycleData();
        }
        let tableArray = this.state.table;
        if (tableArray[0].cycleid !== this.state.cycleID && this.state.cycleID !== 0){
            this.setTable();
        }
        if (this.state.isLocked || tableArray[0].hometeam === 'await'){
            return(
                <div>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr className="tr5column">
                                <th>תוצאה</th> 
                                <th>ההימור שלך</th> 
                                <th>קבוצת חוץ</th> 
                                <th>קבוצת בית</th> 
                                <th>#</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {tableArray.map((game,i) => {
                                if (game.isbonus){
                                    return( <tr key={i} className="bonusLine" >
                                            <td ><OverlayTrigger className="OverlayTrigger"
                                                placement={'right'}
                                                overlay={
                                                    <Tooltip id={`tooltip-right`} style={{"width": "150%"}} >
                                                        <Table className="tooltipTable">
                                                            <thead>
                                                                <tr  className="tooltipTableLine">
                                                                    <th></th> 
                                                                    <th>:הימורים</th>    
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {game.bets.map((bet,i) => {
                                                                        let showenBet = bet;
                                                                        if (bet === 3)
                                                                            showenBet = 'x';
                                                                        return (
                                                                            <tr key={i} className="tooltipTableLine">
                                                                                <td className="tooltipTableText" >{showenBet}</td>
                                                                                <td  className="tooltipTableText" >{this.props.membersNames[i]}</td>
                                                                            </tr>
                                                                        ); 
                                                                    })
                                                                }
                                                            </tbody>
                                                        </Table>
                                                    </Tooltip>
                                                }>
                                                <Button className="invisibleButton">{game.score}</Button>
                                                </OverlayTrigger></td>
                                            <td>{game.userBet}</td>
                                            <td>{game.awayteam}</td>
                                            <td>{game.hometeam}</td>
                                            <td className="hebrew" >בונוס</td>
                                        </tr>
                                    );
                                } else {
                                    return( <tr key={i} className="tr5column" >
                                            <td ><OverlayTrigger className="OverlayTrigger"
                                                placement={'right'}
                                                overlay={
                                                    <Tooltip id={`tooltip-right`} style={{"width": "150%"}} >
                                                        <Table className="tooltipTable">
                                                            <thead>
                                                                <tr  className="tooltipTableLine">
                                                                    <th></th> 
                                                                    <th>:הימורים</th>    
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {game.bets.map((bet,i) => {
                                                                        let showenBet = bet;
                                                                        if (bet === 3)
                                                                            showenBet = 'x';
                                                                        return (
                                                                            <tr key={i} className="tooltipTableLine">
                                                                                <td className="tooltipTableText" >{showenBet}</td>
                                                                                <td  className="tooltipTableText" >{this.props.membersNames[i]}</td>
                                                                            </tr>
                                                                        ); 
                                                                    })
                                                                }
                                                            </tbody>
                                                        </Table>
                                                    </Tooltip>
                                                }>
                                                <Button className="invisibleButton">{game.score}</Button>
                                                </OverlayTrigger></td>
                                            <td>{game.userBet}</td>
                                            <td>{game.awayteam}</td>
                                            <td>{game.hometeam}</td>
                                            <td>{i+1}</td>
                                        </tr>
                                    );
                                }
                            })}                
                        </tbody>
                    </Table>
                </div>
            );
        } else {
        return (
            <div>
                <Form onSubmit={(e)=> {
                        e.preventDefault()
                        this.handleSubmit()}} >
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>הימור</th> 
                                <th>קבוצת חוץ</th> 
                                <th>קבוצת בית</th> 
                                <th>#</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {tableArray.map((game,i) => {
                                if (game.isbonus){
                                    return( <tr key={i} className="bonusLineFour" >
                                            <td className="hebrew" className="bet" >
                                                <Form.Group className="bet" >
                                                    <Form.Control className="bet"  as="select" size="sm"  key={i} onChange={(e)=>this.handleChange(e, i)} value={game.userBet}>
                                                        <option value='0' className="hebrew" >ממתין</option>
                                                        <option value='1' className="hebrew"  >1</option>
                                                        <option value='2' className="hebrew" >2</option>
                                                        <option value='3' className="hebrew" >x</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </td>
                                            <td>{game.awayteam}</td>
                                            <td>{game.hometeam}</td>
                                            <td className="hebrew" >בונוס</td>
                                        </tr>
                                    );
                                } else {
                                    return( <tr key={i} className="hebrew" >
                                            <td className="hebrew" className="bet" >
                                                <Form.Group className="bet" >
                                                    <Form.Control className="bet"  as="select" size="sm"  key={i} onChange={(e)=>this.handleChange(e, i)} value={game.userBet}>
                                                        <option value='0' className="hebrew" >ממתין</option>
                                                        <option value='1' className="hebrew"  >1</option>
                                                        <option value='2' className="hebrew" >2</option>
                                                        <option value='3' className="hebrew" >x</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </td>
                                            <td>{game.awayteam}</td>
                                            <td>{game.hometeam}</td>
                                            <td>{i+1}</td>
                                        </tr>
                                    );
                                }
                            })}    
                        </tbody>
                        <Button size="lg" style={{color: "black"}} type="submit">שמור הימור</Button>
                    </Table>
                </Form>
            </div>
        );}
    }
}