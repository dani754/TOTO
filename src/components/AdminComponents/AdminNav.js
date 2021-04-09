import React from 'react';
import {NavDropdown, Nav} from 'react-bootstrap';
import '../../style.css';
import '../../importStyle.css';

export default function AdminNav(props){
    let allCycles = props.cycles;
    allCycles.sort(function(a, b){return b-a});
    let actions = <></>;
    if (props.cycleID > 0){
        actions =  <NavDropdown id="nav-dropdown"  title="שינוי סטטוס מחזור נוכחי"  className="secondNavItem"  >
                        <NavDropdown.Item eventKey="lock" > נעילת מחזור להימורים </NavDropdown.Item>
                        <NavDropdown.Item eventKey="close" > סגירת מחזור (נועל את התוצאות ומוסיף את המחזור הבא לטבלת הליגה)</NavDropdown.Item>
                    </NavDropdown>
    }
    if (props.cycleID===0){
        return (
            <div >
                <Nav onSelect={(eventKey)=>props.onSelect(eventKey)} className="adminNav" >
                    <NavDropdown id="nav-dropdown"  title="החלף מחזור"  className="secondNavItem"  >
                        {allCycles.map((id,i)=>{
                            return(
                                <NavDropdown.Item eventKey={id} key={i} > {allCycles.length-i} מחזור</NavDropdown.Item>
                            ); 
                        })}
                        <NavDropdown.Divider />
                        <NavDropdown.Item eventKey="addCycle" >הוסף מחזור חדש  </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Item className="secondNavItem">
                        <Nav.Link  eventKey="LeagueData">עמוד ליגה</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    } else {
        return (
            <div >
                <Nav onSelect={(eventKey)=>props.onSelect(eventKey)} className="adminNav" >
                    <Nav.Item className="secondNavItem">
                        <Nav.Link  eventKey={props.cycleID} > {allCycles.length-allCycles.indexOf(parseInt(props.cycleID))} מחזור </Nav.Link>
                    </Nav.Item>
                    <NavDropdown id="nav-dropdown"  title="החלף מחזור"  className="secondNavItem"  >
                        {allCycles.map((id,i)=>{
                            return(
                                <NavDropdown.Item eventKey={id} key={i} > {allCycles.length-i} מחזור</NavDropdown.Item>
                            ); 
                        })}
                        <NavDropdown.Divider />
                        <NavDropdown.Item eventKey="addCycle" >הוסף מחזור חדש  </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Item className="secondNavItem">
                        <Nav.Link  eventKey="LeagueData">עמוד ליגה</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    }   
}
