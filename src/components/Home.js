import React from 'react';
import NavBar from './NavBar';
import League from './pages/League';
import Admin from './pages/Admin';
import Cycle from './pages/Cycle';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import CheckBetsAfterUpdate from './pop-ups/CheckBetsAfterUpdate';
import '../style.css';
import '../importStyle.css';

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            navBar: "טוען טבלה...",
            userID: 0,
            userName: '',
            isAdmin: 0,
            image: '',
            currentLeagueID: 0,
            leagueName: '',
            membersIDs: [],
            membersNames: [],
            cyclesIDs: [],
            membersScores: [],
            currentCycle: 0,
            showCycle: 0,
            cyclesDB: 0,
            toast: <p></p>,
        }
    }
    

    getUserData = () => {
        fetch(`https://toto-server.herokuapp.com/home/user/${this.props.userID}`,
        {
            method: "get",
            dataType: "json",
            headers: {'Content-Type': 'application/json'},
        })
        .then( res => res.json() )
        .then (data => {
            const result = data;
            this.setState({
                userID: result.userid,
                userName: result.username,
                isAdmin: result.is_admin,
                image: result.image,
                currentLeagueID: result.leagueData.leagueid,
                leagueName: result.leagueData.leaguename,
                membersIDs: result.leagueData.members_ids,
                membersNames: result.leagueData.members_names,
                cyclesIDs: result.leagueData.cycles_ids,
                membersScores: result.leagueData.members_scores_league,
                currentCycle: result.leagueData.current_cycle_id,
                showCycle: result.leagueData.current_cycle_id,  
            });
            console.log("home data",result, this.state);
        }).catch(err => console.log('home', err));
    }

    switchTab = (eventKey) => {
        console.log("switchTab", eventKey)
        let returnedTable;
        switch(eventKey){
            case "profile":
                returnedTable = <Profile  />
                break;
            case "league":
                returnedTable = <League userName={this.state.userName}
                                        image={this.state.image}
                                        leagueName = {this.state.leagueName}
                                        membersNames = {this.state.membersNames}
                                        membersScores = {this.state.membersScores}
                                        currentCycle = {this.state.currentCycle}
                />
                break;
            case "feed":
                returnedTable = <Feed />
                break;
            default: 
                this.setState({showCycle: eventKey});
                returnedTable =  <Cycle cycleID = {this.state.showCycle}
                                        membersNames = {this.state.membersNames}
                                        membersIDs = {this.state.membersIDs}
                                        userID = {this.state.userID}
                                        showBetUpdatingToast = {(complete) => this.setState({
                                            toast: <CheckBetsAfterUpdate show={true} complete={complete} />
                                        })}
                />
        }
        this.setState({navBar: returnedTable});
    }

    render (){
        if (this.props.userID !== 0 && this.state.userID === 0){
                this.getUserData();
        }
        if (this.state.isAdmin){
            return (
                <Admin leagueID={this.state.currentLeagueID} />
            );
        } else {
            if (this.state.navBar === "טוען טבלה..."  && this.state.currentCycle !== 0){
                this.switchTab("league");
            }
            return(
                <div>
                    <NavBar onClick={()=>{this.props.logOut()}}
                            onSelect={(eventKey)=>{this.switchTab(eventKey)}} 
                            cycles={this.state.cyclesIDs}
                            currentCycle={this.state.showCycle} />
                    {this.state.toast}
                    {this.state.navBar}
                </div>
            );
        }
        
    }
}

