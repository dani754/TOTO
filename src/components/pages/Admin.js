import React from 'react';
import AdminNav from './AdminNav';
import CyclesUpdate from '../AdminComponents/CyclesUpdate';
import LeagueData from '../AdminComponents/LeagueData';
import * as Actions from '../AdminComponents/CycleActions';
import ToastMessage from '../pop-ups/ToastMessage';
import '../../importStyle.css';

export default class AdminPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            leagueID: 0,
            leagueName: '',
            cyclesIDs: [],
            membersIDs: [],
            membersNames: [],
            membersScores: [],          
            currentCycle: 0,
            cyclesDB: 0,
            showCycle: 0,
            showCycleData: {cycleid: 0},
            gamesDB: [],
            table: 0,
            toast: <p></p>,
        }
    }

    fullLeagueData = () => {
        fetch(`https://toto-server.herokuapp.com/leagueadmin/${this.props.leagueID}`,
        {
            method: "get",
            dataType: "json",
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((data) => {
            let result = data;
            let cycleData = result.cyclesDB.find( cycle => cycle.cycleid === parseInt(result.current_cycle_id));
            this.setState({
                leagueID: result.leagueid,
                leagueName: result.leaguename,
                cyclesIDs: result.cycles_ids,
                membersIDs: result.members_ids,
                membersNames: result.members_names,
                membersScores: result.members_scores_league,
                currentCycle: result.current_cycle_id,
                showCycle: result.current_cycle_id,
                cyclesDB: result.cyclesDB,
                showCycleData: cycleData,
                gamesDB: result.gamesDB,
            });
            console.log("league data in admin page", result, this.state);
        }).catch(err => console.log('AdminPage', err))
    }

    getGamesDB = () => {
        fetch(`https://toto-server.herokuapp.com/gamesDB/${this.state.showCycle}`,
        {
            method: "get",
            dataType: "json",
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((data) => {
            this.setState({
                gamesDB: data,
            });
            console.log("gamesDB in admin page", data);
        }).catch(err => console.log('AdminPage', err))
    }

    switchTab = (eventKey) => {
        let returnedTable; 
        switch(eventKey){
            case "LeagueData":
                returnedTable = <LeagueData data={this.state} onDataChange={()=>this.setState({leagueID:0})} />;
                break;
            case "addCycle":
                Actions.addCycle (this.props.leagueID);
                this.setState({toast: <ToastMessage pop={true} onClose= {()=>{this.setState({toast: 0})}}
                                                    message="נוסף מחזור חדש לליגה!"   /> ,
                            leagueID: 0});
                returnedTable = <LeagueData data={this.state} onDataChange={()=>this.setState({leagueID:0})} />;
                break; 
            case "close":
                Actions.closeCycle (this.state.showCycle);
                this.setState({toast: <ToastMessage pop={true}  onClose= {()=>{this.setState({toast: 0})}}
                                                    message="המחזור סגור - לא ניתן לעדכן יותר תוצאות"   /> ,
                            leagueID: 0});
                returnedTable = <LeagueData data={this.state} onDataChange={()=>this.setState({leagueID:0})} />;
                break; 
            case "lock":
                let verified = Actions.verifyBets
                if (verified){
                    Actions.lockCycle (this.state.showCycle);
                    this.setState({toast: <ToastMessage pop={true}  onClose= {()=>{this.setState({toast: 0})}}
                                                        message="המחזור נעול - לא ניתן להמר"   /> ,
                                leagueID: 0});
                    returnedTable = <LeagueData data={this.state} onDataChange={()=>this.setState({leagueID:0})} />;
                } else {
                    this.setState({toast: <ToastMessage pop={true}  onClose= {()=>{this.setState({toast: 0})}}
                    message="קיימים שחקנים שטרם שלחו הימור - לא ניתן לנעול את המחזור"   /> ,
                    leagueID: 0});
                    returnedTable = <CyclesUpdate   data={this.state} cycleID={this.state.showCycle}
                                                onSelect={(eventKey)=>{this.switchTab(eventKey)}} />;
                }
                break; 
            case "unlock":
                this.setState({toast: <ToastMessage pop={true}  onClose= {()=>{this.setState({toast: 0})}}
                                                    message="נעילת המחזור בוטלה"   /> ,
                            leagueID: 0});
                Actions.unlockCycle (this.state.showCycle);
                returnedTable = <LeagueData data={this.state} onDataChange={()=>this.setState({leagueID:0})} />;
                break; 
            case "unclose":
                Actions.uncloseCycle (this.state.showCycle);
                this.setState({toast: <ToastMessage pop={true}  onClose= {()=>{this.setState({toast: 0})}}
                                                    message="המחזור נפתח לעדכון תוצאות משחקים"   /> ,
                            leagueID: 0});
                returnedTable = <LeagueData data={this.state} onDataChange={()=>this.setState({leagueID:0})} />;
                break; 
            case "scoreUpdate":
                this.setState({toast: <ToastMessage pop={true}  onClose= {()=>{this.setState({toast: 0})}}
                                                    message="תוצאות המחזור עודכנו"   /> ,
                            leagueID: 0});
                returnedTable = <LeagueData data={this.state} onDataChange={()=>this.setState({leagueID:0})} />;
                break; 
            default: {
                this.setState({showCycle: eventKey});
                returnedTable = <CyclesUpdate   cycleData={this.state.showCycleData}
                                                gamesDB={this.state.gamesDB}
                                                onSelect={(eventKey)=>{this.switchTab(eventKey)}}
                />
            }
        }
        this.setState({table: returnedTable});
    }


    render (){
        if (this.props.leagueID !== 0 && this.state.leagueID === 0){
                this.fullLeagueData();
        };
        if (this.state.leagueID !== 0 && this.state.gamesDB !== [] && this.state.showCycle !== this.state.gamesDB[0].cycleid){
            this.getGamesDB();
        };
        if (this.state.leagueID !==0 && this.state.table === 0){
            this.switchTab(this.state.showCycle);
        };
        
        return (
            <div>
                {this.state.toast}
                <AdminNav   onSelect={(eventKey)=>{this.switchTab(eventKey)}} 
                            cycles={this.state.cyclesIDs} 
                            cycleID = {this.state.showCycle}
                            cycleData = {this.state.showCycleData}
                             />
                {this.state.table}
            </div>
        );
    }
}