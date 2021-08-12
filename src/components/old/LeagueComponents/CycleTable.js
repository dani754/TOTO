import React from 'react';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../style.css';
import '../../importStyle.css';

export default class CycleTable extends React.Component {
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


    cycleData = (url) => {
        let membersArray = this.props.data.membersids;
        let findUserIndexInLeague = membersArray.indexOf(this.props.userID);
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
                    membersScores: result.membersscores,
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
                let bet = game.membersbets[this.state.userIndex];
                if (this.state.isLocked && bet === 3)
                    bet = 'x';
                let bonusMark = '';
                if (game.isbonus)
                    bonusMark = 'בונוס! ';
                return {
                    hometeam: game.hometeam,
                    awayteam: game.awayteam,
                    score: scoreUpdate,
                    userBet: bet,
                    cycleid: game.cycleid,
                    gameID: game.gameid,
                    bonus: bonusMark,
                    isbonus: game.isbonus,
                    bets: game.membersbets,
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

    handleSubmit = () => {
        if (this.state.table[0].cycleid === this.state.cycleID && Array.isArray(this.state.gamesDB) && this.state.gamesDB.length > 0){
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
                return this.props.onSubmit(this.state.table);
            }).catch(err => console.log("updatebets", err))
        }
    }


    
    render (){
        let url = `https://toto-server.herokuapp.com/home/cycle/${this.props.cycleID}`;
        if (parseInt(this.state.cycleID) !== parseInt(this.props.cycleID)){
            this.cycleData(url);
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
                                                                                <td  className="tooltipTableText" >{this.props.data.names_array[i]}</td>
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
                                                                                <td  className="tooltipTableText" >{this.props.data.names_array[i]}</td>
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