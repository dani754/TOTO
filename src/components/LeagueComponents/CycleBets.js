import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../style.css';
import '../../importStyle.css';

export default class CycleBets extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            cycleID: 0,
            gamesIDs: [],
            cycleOrderInLeague: 0,
            isLocked: true,
            membersScores: [],
            gamesDB: [],
            table: [{gameid: 1, hometeam: 'await', awayteam: 'await', score: 'await', userBet: 0, cycleid: 0}],
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
                console.log("state bets cycle" , this.state)
            }).catch(err => console.log(err));
    }

    setTable = () => {
        let newTable = [{gameid: 1, hometeam: 'await', awayteam: 'await', score: 'await', userBet: 'await', cycleid: parseInt(this.props.cycleID)}];
        if (Array.isArray(this.state.gamesDB) && this.state.gamesDB.length > 0){
            newTable = this.state.gamesDB.map((game)=>{
                let scoreUpdate = 'await';
                let bet = 'await';
                if (game.score > 0)
                    scoreUpdate = game.score;
                if (scoreUpdate === 3)
                    scoreUpdate = 'x';
                if (Array.isArray(game.membersbets) && game.membersbets[this.state.userIndex] !== 0){
                    if (game.membersbets[this.state.userIndex] === 3)
                        bet = 'x';
                    else
                        bet = game.membersbets[this.state.userIndex];
                }
                return {
                    hometeam: game.hometeam,
                    awayteam: game.awayteam,
                    score: scoreUpdate,
                    userBet: bet,
                    cycleid: game.cycleid,
                    gameID: game.gameid,
                };
            });
        }
        this.setState({table: newTable});
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
                return this.props.onSubmit(data.cycleid);
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

                            <th>הימור</th> 
                            <th>תוצאה</th> 
                            <th>קבוצת חוץ</th> 
                            <th>קבוצת בית</th> 


                            <th>#</th> 

                            </tr>
                        </thead>
                        <tbody>
                            {tableArray.map((game, i) => {
                                return( <tr key={i} className="tr5column">
                                        <td>{game.userBet}</td>

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
        } else {
            console.log("table bets", this.state.table);
            return (
                <div>
                    <Form onSubmit={()=>this.handleSubmit()}>
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
                                        return( <tr key={i} className="hebrew" >
                                                    <td className="hebrew" >
                                                        <Form.Group className="hebrew" >
                                                            <Form.Control className="hebrew"  as="select" size="sm"  key={i} onChange={(e)=>this.handleChange(e, i)} value={game.userBet}>
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
                                    })}    
                            </tbody>
                            <Button size="lg" style={{color: "black"}} type="submit">שמור הימור</Button>
                        </Table>
                    </Form>
                </div>
            );
        }
    }
}