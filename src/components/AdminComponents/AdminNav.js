import React from 'react';
import {NavDropdown, Nav} from 'react-bootstrap';
import '../../style.css';
import '../../importStyle.css';

export default function AdminNav(props){
    let allCycles = props.cycles;
    allCycles.sort(function(a, b){return b-a});
    let actions = <></>;
    if (props.cycleID > 0){
        actions =  <NavDropdown id="nav-dropdown"  title="edit cycle"  className="secondNavItem"  >
                        <NavDropdown.Item eventKey="lock" >lock cycle (no more bets) </NavDropdown.Item>
                        <NavDropdown.Item eventKey="close" >close cycle (no more scores updates) </NavDropdown.Item>
                    </NavDropdown>
    }
    return (
        <div >
            <Nav onSelect={(eventKey)=>props.onSelect(eventKey)} >
                <Nav.Item className="secondNavItem">
                    <Nav.Link  eventKey={props.cycleID} >Cycle {allCycles.length-allCycles.indexOf(parseInt(props.cycleID))} </Nav.Link>
                </Nav.Item>
                {actions}
                <NavDropdown id="nav-dropdown"  title="switch cycle"  className="secondNavItem"  >
                    {allCycles.map((id,i)=>{
                        return(
                            <NavDropdown.Item eventKey={id} key={i} >cycle {allCycles.length-i}</NavDropdown.Item>
                        ); 
                    })}
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="addCycle" > add a new cycle </NavDropdown.Item>
                </NavDropdown>
                <Nav.Item className="secondNavItem">
                    <Nav.Link  eventKey="LeagueData">League Data</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}
