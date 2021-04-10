import React from 'react';
import {NavDropdown, Nav} from 'react-bootstrap';
import '../../style.css';
import '../../importStyle.css';

export default function AdminNav(props){
    let allCycles = props.cycles;
    allCycles.sort(function(a, b){return b-a});
    return (
        <div >
            <Nav onSelect={(eventKey)=>props.onSelect(eventKey)} className="adminNav" >
                <Nav.Item className="secondNavItem">
                    <Nav.Link  eventKey={props.cycleID} > {allCycles.length-allCycles.indexOf(parseInt(props.cycleID))} מחזור </Nav.Link>
                    <NavDropdown id="nav-dropdown" className="inlineDropmenu"  >
                        {allCycles.map((id,i)=>{
                            return(
                                <NavDropdown.Item eventKey={id} key={i} > {allCycles.length-i} מחזור</NavDropdown.Item>
                            ); 
                        })}
                        <NavDropdown.Divider />
                        <NavDropdown.Item eventKey="addCycle" >הוסף מחזור חדש  </NavDropdown.Item>
                    </NavDropdown>
                </Nav.Item>
                <Nav.Item className="secondNavItem">
                    <Nav.Link  eventKey="LeagueData">עמוד ליגה</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}
