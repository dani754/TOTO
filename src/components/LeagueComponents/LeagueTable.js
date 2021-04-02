import React from 'react';
import Table from 'react-bootstrap/Table';
import '../../style.css';
import '../../importStyle.css';

export default class LeagueTable extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            table: [
                {userName: 'await',
                totalScore: 1,
                currentCycleScore: 1,
                originIndex: 0}],
            cycleID: 0,
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
                    cycleData: result,
                });
                console.log("state cycle" , this.state)
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
        if (this.props.data.current_cycle !== 0){
            let url = `https://toto-server.herokuapp.com/home/cycle/${this.props.data.current_cycle}`;
            if (this.state.cycleID !== this.props.data.current_cycle){
                this.cycleData(url);
            } 
        }
        if (Array.isArray(this.props.data.names_array) && this.state.table[0].userName === 'await' && this.state.cycleID !==0){
            let membersNames = this.props.data.names_array;
            let tableArray = membersNames.map((user,i)=>{
                return {
                    index: i,
                    userName: user,
                    totalScore: this.props.data.scores_array[i],
                    currentCycleScore: this.state.cycleData.membersscores[i],
                 };
            });
            this.setState({table: tableArray});
        };
        return (
            <div>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th type="button" className="sortButton" onClick={()=>this.sortByCycleScore()}>מחזור נוכחי</th> 
                            <th type="button" className="sortButton" onClick={()=>this.sortByTotalScore()}>נקודות</th> 

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