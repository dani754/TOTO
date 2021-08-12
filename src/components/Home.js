import React from 'react';
import LeaguePage from './pages/LeaguePage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import Join from './pages/Join';
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
            leagues: [],
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
    

    leagueData = () => {
        fetch(`https://toto-server.herokuapp.com/home/league/${this.state.currentLeagueID}`,
        {
            method: "get",
            dataType: "json",
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((data) => {
            let result = data;
            this.setState({
                leagueName: result.leaguename,
                cyclesIDs: result.cycles_ids,
                membersIDs: result.members_ids,
                membersNames: result.members_names,
                membersScores: result.members_scores_league,
                currentCycle: result.current_cycle_id,
                showCycle:  result.current_cycle_id,
            });
            console.log("league data", result, this.state);
        }).catch(err => console.log('league data', err))
    }

    userData = () => {
        fetch(`https://toto-server.herokuapp.com/home/user/${this.props.user}`,
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
                currentLeagueID: 1,
                isAdmin: result.is_admin,
                leagues: result.leagues,
                image: result.image,
            });
            console.log("home data",result, this.state);
        }).then (()=> this.leagueData())
        .catch(err => console.log('home', err))
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
                this.userData();
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

