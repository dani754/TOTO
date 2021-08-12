import React from 'react';
import LeaguePage from './pages/LeaguePage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import HomeNavbar from './pages/HomeNavbar';
import '../style.css';
import '../importStyle.css';

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            navBar: <p>league</p>,
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
            const result = data[0];
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
                returnedTable = <p>profile</p>
                break;
            case "league":
                returnedTable = <p>league</p>
                break;
            case "news":
                returnedTable = <p>news</p>
                break;
            default: 
                this.setState({showCycle: eventKey});
                returnedTable =  <p>cycle {this.state.showCycle}</p>
        }
        this.setState({navBar: returnedTable});
    }

    render (){
        if (this.props.userID !== 0 && this.state.userID === 0){
                this.getUserData();
        }
        if (this.state.isAdmin !== 0){
            return (
                <AdminPage leagueID={this.state.currentLeagueID}  />
            );
        }
        else {
            return(
                <div>
                    <HomeNavbar onClick={()=>{this.props.logOut()}}
                                onSelect={(eventKey)=>{this.switchTab(eventKey)}} 
                                cycles={this.state.cyclesIDs}
                                currentCycle={this.state.showCycle} />
                    {this.state.navBar}
                </div>
            );
        }
    }
}

