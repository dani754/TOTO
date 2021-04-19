import React from 'react';
import {NavDropdown, Nav} from 'react-bootstrap';
import '../../style.css';
import '../../importStyle.css';

export default function AdminNav(props){

    let allCycles = props.cycles;
    allCycles.sort(function(a, b){return b-a});

    let showenCycle = props.cycleID;
    if (showenCycle !== 0){
        let cycleCostumizeActions = <><Nav.Item  className="secondNavItem">
                            <Nav.Link  eventKey="lock" > נעילת מחזור </Nav.Link>
                        </Nav.Item></>
        if (props.cycleData.islocked){
            if (props.cycleData.isclosed){
                cycleCostumizeActions = <><Nav.Item  className="secondNavItem">
                                <Nav.Link  eventKey="unclose" > ביטול סגירת מחזור </Nav.Link>
                            </Nav.Item></>
            } else {
                cycleCostumizeActions = <><Nav.Item  className="secondNavItem">
                                <Nav.Link  eventKey="close" > סגירת מחזור </Nav.Link>
                            </Nav.Item>
                            <Nav.Item  className="secondNavItem">
                                <Nav.Link  eventKey="unlock" > ביטול נעילת מחזור </Nav.Link>
                            </Nav.Item></>
            }
        }
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
                    {cycleCostumizeActions}
                    <Nav.Item className="secondNavItem">
                        <Nav.Link  eventKey="LeagueData">עמוד ליגה</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    } else {
        return (
            <div>
                <Nav onSelect={(eventKey)=>props.onSelect(eventKey)} className="adminNav" >
                    <NavDropdown id="nav-dropdown" className="secondNavItem" title="עבור למחזור" >
                        {allCycles.map((id,i)=>{
                            return(
                                <NavDropdown.Item eventKey={id} key={i} > {allCycles.length-i} מחזור</NavDropdown.Item>
                            ); 
                        })}

                    </NavDropdown>
                    <Nav.Item className="secondNavItem">
                        <Nav.Link   eventKey="addCycle" >הוסף מחזור חדש </Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
        );
    }
    
}
