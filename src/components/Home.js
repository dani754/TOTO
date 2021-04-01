import React from 'react';
import LeaguePage from './pages/LeaguePage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import Join from './pages/Join';
import CreateLeague from './pages/CreateLeague';
import HomeNavbar from './pages/HomeNavbar';
import '../style.css';
import '../importStyle.css';

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userID: 0,
            userName: '',
            defaultLeague: 0,
            currentLeague: 0,
            isAdmin: 0,
            leagues: [],
            navBar: 0,
            language: this.props.language,
        }
    }
    

    userData = (url) => {
        fetch(url,
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
                defaultLeague: result.defaultleague,
                isAdmin: result.isadmin,
                leagues: result.leagues,
            });
            console.log("home data",result, this.state);
        }).catch(err => console.log('home', err))
    }

    switchTab = (eventKey) => {
        console.log("switchTab", eventKey)
        let returnedTable;
        switch(eventKey){
            case "profilePage":
                returnedTable = <ProfilePage  userID = {this.state.userID}/>
                break;
            case "adminPage":
                returnedTable = <AdminPage  leagueID = {this.state.isAdmin}/>
                break;
            case "create":
                returnedTable = <CreateLeague userID = {this.state.userID}
                                              userName= {this.state.userName}
                                              newLeague = {()=>{this.setState({userID: 0, defaultLeague:0})}} 
                                              language = {this.state.language}    />;
                break;
            case "join":
                returnedTable = <Join  userID={this.state.userID} 
                                        username={this.state.userName}
                                        onJoining = {(LeagueID)=>{this.switchTab(LeagueID)}}
                                        isAdmin = {this.state.isAdmin}
                                        createLeague = {()=>{this.switchTab("create")}}  />
                break;
            default:{
                    this.setState({currentLeague: parseInt(eventKey)});
                    returnedTable =  <LeaguePage userName = {this.state.userName} 
                                                userID = {this.state.userID}
                                                leagueID = {parseInt(eventKey)}
                                                leagues={this.state.leagues} />
            }
        }
        this.setState({navBar: returnedTable});
    }

    render (){
        let url = `https://toto-server.herokuapp.com/home/user/${this.props.user}`;
        if (this.props.user !== 0){
            if (this.state.userID === 0) {
                this.userData(url);
            }
        }
        if (this.state.defaultLeague === 0 && this.state.userID !== 0){
            return (
                <Join   userID={this.state.userID} 
                        username={this.state.userName}
                        onJoining = {()=>{this.userData(url)}}
                        isAdmin = {this.state.isAdmin}
                        createLeague = {()=>{   
                            console.log("create")
                            this.switchTab("create") }}  />
            );
        }
        else {
            let Content = this.state.navBar;
            if (Content === 0 && this.state.userID !== 0){
                if (this.state.currentLeague === 0)
                    this.switchTab(this.state.defaultLeague);
                else 
                    this.switchTab(this.state.currentLeague);
            }
            return (
                <div>
                    <HomeNavbar onClick={()=>{this.props.logOut()}}
                                onSelect={(eventKey)=>{this.switchTab(eventKey)}} 
                                isAdmin={this.state.isAdmin}
                                leagues={this.state.leagues} 
                                leagueID={this.state.currentLeague} />
                    {Content}
                </div>
            );
        }
    }
}

