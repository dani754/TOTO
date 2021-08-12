import React from 'react';
import Table from 'react-bootstrap/Table';
import '../../style.css';
import '../../importStyle.css';

export default class League extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            table: [
                {userName: 'await',
                totalScore: 1,
                currentCycleScore: 1,
                originIndex: 0}
            ],
            currentCycleScores: [],
        }
    }

    getCurrentCycleScores = (cycleID) => {
        fetch(`https://toto-server.herokuapp.com/home/get-cycle-scores/${cycleID}`,
            {
                method: "get",
                dataType: 'json',
            })
            .then((res) => res.json())
            .then((data) => {
                console.log ('fetching cycle scores', data);
                this.setState({
                    currentCycleScores: data,
                });
            }).catch(err => console.log(err));
    }

    sortByTotalScore = () => {
        let tableArray = this.state.table;
        tableArray.sort(function(a, b){return b.totalScore - a.totalScore});
        console.log("new sort array", tableArray);
        this.setState({table: tableArray});
    }

    sortByCycleScore  = () => {
        let tableArray = this.state.table;
        tableArray.sort(function(a, b){return b.currentCycleScore - a.currentCycleScore});
        console.log("new sort array", tableArray);
        this.setState({table: tableArray});
    }

    render (){
        if (this.state.table[0].userName === 'await' && this.props.currentCycle !== 0){
            let membersNames = this.props.membersNames;
            if (this.state.currentCycleScores.length === 0 ){
                this.getCurrentCycleScores(this.props.currentCycle)
            } else {
                let tableArray = membersNames.map((user,i)=>{
                    return {
                        index: i,
                        userName: user,
                        totalScore: this.props.membersScores[i],
                        currentCycleScore: this.state.currentCycleScores[i],
                     };
                });
                tableArray.sort(function(a, b){return b.totalScore - a.totalScore});
                this.setState({table: tableArray});
            }
        };
        return (
            <div>
                <p></p>
                <h1> שלום {this.props.userName} ! לליגת {this.props.leagueName} </h1>
                <p></p>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th type="button" className="sortButton" onClick={()=>this.sortByCycleScore()}>ניקוד למחזור נוכחי</th> 
                            <th type="button" className="sortButton" onClick={()=>this.sortByTotalScore()}>סה"כ נקודות</th> 

                            <th>שם</th> 

                            <th>#</th> 

                        </tr>
                    </thead>
                    <tbody>
                    {this.state.table.map((user,i) => {
                      return( <tr>
                            <td>{user.currentCycleScore}</td>
                            <td>{user.totalScore}</td>
                            <td>{user.userName}</td>
                            <td>{i+1}</td>
                        </tr>);
                    })}                
                    </tbody>
                </Table>
            </div>
        );
    }
}