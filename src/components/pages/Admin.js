import React from 'react';
import AdminCycle from './AdminCycle';
import AdminLeaguePage from './AdminLeaguePage';
import '../../style.css';
import '../../importStyle.css';

export default class Admin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showCycle: 0,
            leaguePage: false,
        }
    }

    render (){
        if (this.state.showCycle === 0){
            this.setState({showCycle: this.props.currentCycle});
        }
        
        if (this.state.leaguePage) {
            return (
                <div>
                    <AdminLeaguePage    onReturn= {()=> this.setState({leaguePage: false})}
                                        leagueID= {this.props.leagueID}
                                        leagueName = {this.props.leagueName}
                                        currentCycle= {this.props.currentCycle}
                                        cyclesIDs = {this.props.cyclesIDs}
                                        membersNames = {this.props.membersNames}
                    />
                </div>
            );
        }
        else {
            return(
                <div>
                    <AdminCycle onSwitch = {(cycleID) => {this.setState({showCycle: cycleID})}}
                                goToLeaguePage = {() => {this.setState({leaguePage: true})}}
                                cycleID = {this.state.showCycle}
                                leagueSize = {this.props.membersIDs.length}
                                cyclesIDs =  {this.props.cyclesIDs}
                                leagueID = {this.props.leagueID}
                    />
                </div>
            );
        }
    }
}