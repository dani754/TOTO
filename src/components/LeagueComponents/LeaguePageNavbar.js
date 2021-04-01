import React from 'react';
import {NavDropdown, Nav} from 'react-bootstrap';
import '../../style.css';
import '../../importStyle.css';

export default function LeaguePageNavbar(props){

    let allCycles = props.cycles;
    allCycles.sort(function(a, b){return b-a});
    return (
        <div >
            <Nav onSelect={(eventKey)=>props.onSelect(eventKey)} >
                <Nav.Item className="secondNavItem">
                    <Nav.Link eventKey="LeagueTable" >League table</Nav.Link>
                </Nav.Item>
                <Nav.Item className="secondNavItem">
                    <Nav.Link eventKey="CycleTable">Cycle {allCycles.length-allCycles.indexOf(parseInt(props.cycleID))} Table</Nav.Link>
                   
                </Nav.Item>
                <NavDropdown title="switch cycle" id="nav-dropdown" className="secondNavItem">
                    {allCycles.map((id,i)=>{
                        return(
                            <NavDropdown.Item eventKey={id+1000000} key={i} >cycle {allCycles.length-i}</NavDropdown.Item>
                        );
                    })}
                </NavDropdown>
                <Nav.Item className="secondNavItem">
                    <Nav.Link eventKey="CycleBets" >Cycle {allCycles.length-allCycles.indexOf(parseInt(props.betID))} Bets</Nav.Link>
                </Nav.Item>
                <NavDropdown title="switch cycle" id="nav-dropdown" className="secondNavItem">
                    {allCycles.map((id,i)=>{
                        return(
                            <NavDropdown.Item eventKey={id} key={i} >cycle {allCycles.length-i}</NavDropdown.Item>
                        );
                    })}
                    </NavDropdown>
            </Nav>
        </div>
    );
}
