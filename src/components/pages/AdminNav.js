import React from 'react';
import {NavDropdown, Nav} from 'react-bootstrap';
import '../../style.css';
import '../../importStyle.css';

export default function AdminNav(props){

    let allCycles = props.cycles;
    allCycles.sort(function(a, b){return b-a});

    switch (props.tabMode){
        case "lockedForUpdates":
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
                            <Nav.Link  eventKey="unlockBets">בטל נעילת מחזור להימורים</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="secondNavItem">
                            <Nav.Link  eventKey="checkForMissingBets">רשימת הימורים חסרים </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="secondNavItem">
                            <Nav.Link  eventKey="ulockUpdates">בטל נעילת מחזור לעדכונים</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="secondNavItem">
                            <Nav.Link  eventKey="LeagueData">עמוד ליגה</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            );
        case "lockedForBets":
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
                            <Nav.Link  eventKey="setLockBetsTime">הגדר זמן נעילת הימורים אוטומטית</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="secondNavItem">
                            <Nav.Link  eventKey="lockBets">נעילת מחזור להימורים</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="secondNavItem">
                            <Nav.Link  eventKey="checkForMissingBets">רשימת הימורים חסרים </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="secondNavItem">
                            <Nav.Link  eventKey="setAsCurrentCycle">הגדר כמחזור נוכחי </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="secondNavItem">
                            <Nav.Link  eventKey="lockUpdates">נעילת מחזור לעדכוני תוצאות </Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="secondNavItem">
                            <Nav.Link  eventKey="LeagueData">עמוד ליגה</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            );
        case "openCycle":
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
        case "emptyCylce":
            let inputType = "עבור לתצוגת שורות";
            if (props.inputType === "lines"){
                inputType = "עבור לתצוגת טקסט";
            }
            return(
                <div >
                    <Nav onSelect={(eventKey)=>props.onSelect(eventKey)} className="adminNav3" >
                        <Nav.Item className="secondNavItem">
                            <Nav.Link  eventKey={props.cycleID} > {allCycles.length-allCycles.indexOf(parseInt(props.cycleID))} מחזור </Nav.Link>
                            <NavDropdown id="nav-dropdown" className="inlineDropmenu"  >
                                {allCycles.map((id,i)=>{
                                    return(
                                        <NavDropdown.Item eventKey={id} key={i} > {allCycles.length-i} מחזור</NavDropdown.Item>
                                    ); 
                                })}
                            </NavDropdown>
                        </Nav.Item>
                        <Nav.Item className="secondNavItem">
                            <Nav.Link  eventKey="switchInputType">{inputType}</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="secondNavItem">
                            <Nav.Link  eventKey="LeagueData">עמוד ליגה</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            );
        default:
            return(
                <p></p>
            );
    }
}
