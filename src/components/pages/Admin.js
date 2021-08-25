import React from 'react';
import AdminNav from './AdminNav';
import AdminCycle from './AdminCycle';
import AdminModal from './AdminModal';
import AdminLeaguePage from './AdminLeaguePage';
import * as Actions from './AdminActions';
import ToastMessage from '../pop-ups/ToastMessage';
import '../../style.css';
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
            showCycleData: {cycleid: 0,},
            gamesDB: [],
            leaguePage: false,
            inputType: "lines",
            updateGames: false,
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
            let cyclesDB = result.cyclesDB;
            let cycleData = cyclesDB.find( cycle => cycle.cycleid === result.current_cycle_id);
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

    getShowCycleData = () => {
        fetch(`https://toto-server.herokuapp.com/gamesDB/${this.state.showCycle}`,
        {
            method: "get",
            dataType: "json",
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((data) => {
            let cycleData = this.state.cyclesDB.find( cycle => cycle.cycleid === parseInt(this.state.showCycle));
            this.setState({
                gamesDB: data,
                showCycleData: cycleData
            });
            console.log("gamesDB in admin page", data);
        }).catch(err => console.log('AdminPage', err))
    }

    switchTab = (eventKey) => {
        switch(eventKey){
            case "switchInputType":
                if (this.state.inputType === "lines"){
                    this.setState({inputType: "text"});
                } else {
                    this.setState({inputType: "lines"});
                }
                break;
            case "LeagueData":
                this.setState({leaguePage: true});
                break;
            case "addCycle":
                let newCycleID = Actions.addCycle (this.state.leagueID);
                let newCyclesIDsArray = this.state.cyclesIDs;
                newCyclesIDsArray.push(newCycleID);
                this.setState({showCycle: newCycleID,
                                gamesDB: [],
                                showCycleData: {cycleid: newCycleID},
                                cyclesIDs: newCyclesIDsArray,
                });
                break;
            case "setLockBetsTime":
                break;
            case "lockBets":
                Actions.lockBets(this.state.showCycle);
                let lockBetsState = this.state.showCycleData;
                lockBetsState.lock_for_bets = true;
                this.setState({showCycleData: lockBetsState});
                break;
            case "checkForMissingBets":
                break;
            case "unlockBets":
                Actions.unlockBets(this.state.showCycle);
                let unlockBetsState = this.state.showCycleData;
                unlockBetsState.lock_for_bets = false;
                this.setState({showCycleData: unlockBetsState});
                break;
            case "setCurrentCycle":
                let cycle = this.state.showCycle;
                Actions.setCurrentCycle(cycle, this.state.leagueID);
                this.setState({currentCycle: cycle});
                break;
            case "lockUpdates":
                Actions.lockUpdates(this.state.showCycle);
                let lockUpdatesState = this.state.showCycleData;
                lockUpdatesState.lock_for_updates = true;
                this.setState({showCycleData: lockUpdatesState});
                break;
            case "ulockUpdates":
                Actions.unlockUpdates(this.state.showCycle);
                let unlockUpdatesState = this.state.showCycleData;
                unlockUpdatesState.lock_for_updates = false;
                this.setState({showCycleData: unlockUpdatesState});
                break;
            default:
                this.setState({showCycle: eventKey});
        }
    }


    render (){
        if (this.props.leagueID !== 0 && this.state.leagueID === 0){
                this.fullLeagueData();
        };
        if (this.state.leagueID !== 0 && (
            (Array.isArray(this.state.gamesDB) && this.state.gamesDB.length !== 0 && this.state.showCycle !== this.state.gamesDB[0].cycleid)
            || (this.state.showCycle !== this.state.showCycleData.cycleid))){
            this.getShowCycleData();
        };

        if (this.state.leaguePage) {
            return (
                <AdminLeaguePage    onReturn= {()=> this.setState({leaguePage: false})}
                                    leagueID= {this.state.leagueID}
                                    leagueName = {this.state.leagueName}
                                    currentCycle= {this.state.currentCycle}
                                    cyclesIDs = {this.state.cyclesIDs}
                                    membersNames = {this.state.membersNames}
                />
            );
        }
        else {
            return(
                <div>
                    <AdminNav   onSelect = { (eventKey) => {this.switchTab(eventKey)}}
                                cycles={this.state.cyclesIDs} 
                                cycleID = {this.state.showCycle}
                                cycleData = {this.state.showCycleData}
                                gamesDB = {this.state.gamesDB}
                                inputType = {this.state.inputType}
                    />
                    <AdminModal />
                    <AdminCycle cycleID = {this.state.showCycle}
                                cycleData = {this.state.showCycleData}
                                gamesDB = {this.state.gamesDB}
                                inputType = {this.state.inputType}
                    />
                </div>
            );
        }
    }
}