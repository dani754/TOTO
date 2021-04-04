import React from 'react';
import {NavDropdown, Nav} from 'react-bootstrap';
import '../../style.css';
import '../../importStyle.css';

export default function LeaguePageNavbar(props){

    let allCycles = props.cycles;
    allCycles.sort(function(a, b){return b-a});
    return (
        <div >
            <Nav onSelect={(eventKey)=>props.onSelect(eventKey)} className="secondNav" >
                <Nav.Item className="secondNavItem">
                    <Nav.Link eventKey="CycleTable">מחזור {allCycles.length-allCycles.indexOf(parseInt(props.cycleID))} </Nav.Link>
                    <NavDropdown id="nav-dropdown" className="inlineDropmenu">
                    {allCycles.map((id,i)=>{
                        return(
                            <NavDropdown.Item eventKey={id} key={i} >מחזור {allCycles.length-i}</NavDropdown.Item>
                        );
                    })}
                    </NavDropdown>
                </Nav.Item>
                <Nav.Item className="secondNavItem">
                    <Nav.Link eventKey="LeagueTable" >טבלת הליגה</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}
