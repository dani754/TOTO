import React from 'react';
import LeaguePageNavbar from '../LeagueComponents/LeaguePageNavbar';
import LeagueTable from '../LeagueComponents/LeagueTable';
import CycleTable from '../LeagueComponents/CycleTable';
import CycleBets from '../LeagueComponents/CycleBets';
import CheckBetsAfterUpdate from '../LeagueComponents/CheckBetsAfterUpdate';
import '../../style.css';
import '../../importStyle.css';

export default class LeaguePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            table: 0,
            data: {},
            leagueID: 0,
            leagueName: '',
            cyclesIDs: [],
            membersIDs: [],
            userIndex: 0,
            leagues: this.props.leagues,
            currentCycleTable: 0,
            currentBetsCycle: 0,
            toast: <p></p>,
        }
    }

    leagueData = (url) => {
        fetch(url,
        {
            method: "get",
            dataType: "json",
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((data) => {
            let result = data;
            console.log("league data", result);
            this.setState({
                data: result,
                leagueID: result.leagueid,
                leagueName: result.leaguename,
                cyclesIDs: result.cyclesids,
                membersIDs: result.membersids,
                currentCycleTable: result.current_cycle,
                currentBetsCycle: result.cyclesids[result.cyclesids.length-1],
                table: 0,
            });
        }).catch(err => console.log('LeaguePage', err))
    }

    checkBets = (table) => {
        let complete = true;
        for (let i = 0; i<table.length; i++){
            if (! (table[i].userBet >= 1 && table[i].userBet <= 3 ||  table[i].userBet === 'x')){
                complete = false;
            }
        }
        this.setState({
            toast: <CheckBetsAfterUpdate show={true} complete={complete} />
        });
    }

    switchTab = (eventKey) => {
        let returnedTable;
        switch(eventKey){
            case "LeagueTable":
                returnedTable = <LeagueTable data={this.state.data} />;
                break;
            case "CycleTable":
                returnedTable = <CycleTable data={this.state.data} cycleID={this.state.currentCycleTable}/>;
                break;
            case "CycleBets":
                returnedTable = <CycleBets data={this.state.data} userID={this.props.userID}
                                            cycleID={this.state.currentBetsCycle} onSubmit={(table)=> {
                                                                                        this.switchTab("LeagueTable")
                                                                                        this.checkBets(table) } }  />
                break;
           default: {
                if (eventKey-1000000 >0){
                    this.setState({currentCycleTable: eventKey-1000000});
                    returnedTable = <CycleTable data={this.state.data} cycleID={eventKey-1000000} />;
                } else {
                    this.setState({currentBetsCycle: eventKey});
                    returnedTable = <CycleBets data={this.state.data} cycleID={eventKey} userID={this.props.userID} onSubmit={(id)=>{this.switchTab(id)}} />;
                }
                    
            }
        }
        this.setState({table: returnedTable});
    }


    render (){
        if (this.props.leagueID !== 0){
            let url = `https://toto-server.herokuapp.com/home/league/${this.props.leagueID}`;
            if (this.state.leagueID !== this.props.leagueID){
                this.leagueData(url);
            }   
        }
        let Content = this.state.table;
        if (Content === 0 && this.state.leagueID !== 0){
            this.switchTab("LeagueTable");
        };
        let toast = this.state.toast;
        return (
            <div>
                <p></p>
                <h1 className="hebrew"> שלום {this.props.userName} ! ברוכים הבאים לליגת {this.state.leagueName} </h1>
                {toast}
                <LeaguePageNavbar   onSelect={(eventKey)=>{this.switchTab(eventKey)}} 
                                    leagues={this.state.leagues} 
                                    cycles={this.state.cyclesIDs}
                                    leagueID={this.state.leagueID}
                                    cycleID={this.state.currentCycleTable}
                                    betID={this.state.currentBetsCycle}
                                    />
                <p></p>
                {Content}
            </div>
        );
    }
}