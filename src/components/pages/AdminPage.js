import React from 'react';
import AdminNav from '../AdminComponents/AdminNav';
import CyclesUpdate from '../AdminComponents/CyclesUpdate';
import LeagueData from '../AdminComponents/LeagueData';
import * as Actions from '../AdminComponents/CycleActions';
import ToastMessage from '../ToastMessage';
import '../../importStyle.css';

export default class AdminPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            leagueID: 0,
            leagueName: '',
            cyclesIDs: [],
            membersIDs: [],
            names_array: [],
            scores_array: [],
            current_cycle: 0,
            scoring_method: 1,
            cyclesDB: 0,
            showCycle: 0,
            table: 0,
            toast: <p></p>,
        }
    }

    fullLeagueData = (url) => {
        fetch(url,
        {
            method: "get",
            dataType: "json",
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((data) => {
            let result = data;
            this.setState({
                leagueID: result.leagueid,
                leagueName: result.leaguename,
                cyclesIDs: result.cyclesids,
                membersIDs: result.membersids,
                names_array: result.names_array,
                scores_array: result.scores_array,
                current_cycle: result.current_cycle,
                scoring_method: result.scoring_method,
                cyclesDB: result.cyclesDB,
            });
            console.log("league data in admin page", result, this.state);
        }).catch(err => console.log('AdminPage', err))
    }

    switchTab = (eventKey) => {
        let returnedTable;
        switch(eventKey){
            case "LeagueData":
                this.setState({showCycle: 0});
                returnedTable = <LeagueData data={this.state} onDataChange={()=>this.setState({leagueID:0})} />;
                break;
            case "addCycle":
                Actions.addCycle (this.props.leagueID);
                this.setState({toast: <ToastMessage pop={true} onClose= {()=>{this.setState({toast: 0})}}
                                                    message="נוסף מחזור חדש לליגה!"   /> ,
                                                    leagueID: 0, showCycle: 0});
                returnedTable = <LeagueData data={this.state} />;
                break; 
            case "close":
                Actions.closeCycle (this.state.showCycle);
                this.setState({toast: <ToastMessage pop={true}  onClose= {()=>{this.setState({toast: 0})}}
                                                    message="המחזור סגור - לא ניתן לעדכן יותר תוצאות"   /> ,
                                                    leagueID: 0});
                returnedTable = <LeagueData data={this.state} />;
                break;
            case "lock":
                Actions.lockCycle (this.state.showCycle);
                this.setState({toast: <ToastMessage pop={true}  onClose= {()=>{this.setState({toast: 0})}}
                                                    message="המחזור נעול - לא ניתן להמר"   /> ,
                                                    leagueID: 0});
                returnedTable = <LeagueData data={this.state} />;
                break;
            case "unlock":
                Actions.unlockCycle (this.state.showCycle);
                this.setState({toast: <ToastMessage pop={true}  onClose= {()=>{this.setState({toast: 0})}}
                                                    message="נעילת המחזור בוטלה"   /> ,
                                                    leagueID: 0});
                returnedTable = <LeagueData data={this.state} />;
                break;
            case "unclose":
                Actions.uncloseCycle (this.state.showCycle);
                this.setState({toast: <ToastMessage pop={true}  onClose= {()=>{this.setState({toast: 0})}}
                                                    message="המחזור נפתח לעדכון תוצאות משחקים"   /> ,
                                                    leagueID: 0});
                returnedTable = <LeagueData data={this.state} />;
                break;
            default: {
                this.setState({showCycle: eventKey});
                returnedTable = <CyclesUpdate   data={this.state} cycleID={parseInt(eventKey)}
                                                onSubmit={()=> this.setState({leagueID: 0})} 
                                                onSelect={(eventKey)=>{this.switchTab(eventKey)}}
                                                />
            }
        }
        this.setState({table: returnedTable});
    }


    render (){
        if (this.props.leagueID !== 0){
            let url = `https://toto-server.herokuapp.com/home/leagueadmin/${this.props.leagueID}`;
            if (this.state.leagueID === 0){
                this.fullLeagueData(url);
            }
        }
        let Content = this.state.table;
        if (Content === 0 && this.state.leagueID !== 0){
            this.switchTab(this.state.current_cycle);
        };
        let toast = this.state.toast;
        let cyclesArray = this.state.cyclesDB;
        let cycleData = 0;
        if (Array.isArray(cyclesArray) && this.state.showCycle > 0){
            cycleData = cyclesArray.find( cycle => cycle.cycleid === parseInt(this.state.showCycle))
        }
        return (
            <div>
                <p></p>
                <h1 > ליגת  {this.state.leagueName} - עמוד ניהול </h1>
                {toast}
                <AdminNav   onSelect={(eventKey)=>{this.switchTab(eventKey)}} 
                            cycles={this.state.cyclesIDs} 
                            cycleID = {this.state.showCycle}
                            cycleData = {cycleData}
                             />
                {Content}
            </div>
        );
    }
}