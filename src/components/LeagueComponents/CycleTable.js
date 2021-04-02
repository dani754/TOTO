import React from 'react';
import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
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
            table: [{gameid: 1, hometeam: 'await', awayteam: 'await', score: 'await', cycleid: 0, bets: [0,]}],

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
                    membersScores: result.membersscores,
                    gamesDB: result.gamesDB,
                });
                console.log("state cycle" , this.state)
            }).catch(err => console.log(err));
    }

    setTable = () => {
        let newTable = [{gameid: 1, hometeam: 'await', awayteam: 'await', score: 'await', cycleid: this.props.cycleID, bets: [0,]}];
        if (Array.isArray(this.state.gamesDB) && this.state.gamesDB.length > 0){
            newTable = this.state.gamesDB.map((game)=>{
                let scoreUpdate = 'טרם נקבע';
                if (game.score > 0)
                    scoreUpdate = game.score;
                if (scoreUpdate === 3)
                scoreUpdate = 'x';
                return {
                    hometeam: game.hometeam,
                    awayteam: game.awayteam,
                    score: scoreUpdate,
                    cycleid: game.cycleid,
                    bets: game.membersbets,
                };
            });
        }
        this.setState({table: newTable});
        console.log("new table", this.state.table)
    }

    
    render (){
        let url = `https://toto-server.herokuapp.com/home/cycle/${this.props.cycleID}`;
        if (this.state.cycleID !== this.props.cycleID){
            this.cycleData(url);
        }
        let tableArray = this.state.table;
        if (tableArray[0].cycleid !== this.state.cycleID && this.state.cycleID !== 0){
            this.setTable();
        }
        if (this.state.isLocked){
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
                            {tableArray.map((game,i) => {
                                return( <tr key={i}>
                                            <td><OverlayTrigger className="OverlayTrigger"
                                                placement={'left'}
                                                overlay={
                                                    <Tooltip id={`tooltip-left`} >
                                                        <Table className="tooltipTable">
                                                            <thead>
                                                                <tr  className="tooltipTableLine">
                                                                    <th>Name</th> 
                                                                    <th>Bet</th>    
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {game.bets.map((bet,i) => {
                                                                        let showenBet = bet;
                                                                        if (bet === 3)
                                                                            showenBet = 'x';
                                                                        return (
                                                                            <tr key={i} className="tooltipTableLine">
                                                                                <td>{this.props.data.names_array[i]}</td>
                                                                                <td>{showenBet}</td>
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
        return (
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
                    {tableArray.map((game,i) => {
                      return( <tr key={i}>
                            <td>{game.score}</td>
                            <td>{game.awayteam}</td>

                            <td>{game.hometeam}</td>

                            <td>{i+1}</td>

                        </tr>);
                    })}                
                    </tbody>
                </Table>
            </div>
        );}
    }
}