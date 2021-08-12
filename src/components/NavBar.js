import React from 'react';
import {NavDropdown, Nav} from 'react-bootstrap';
import '../style.css';
import '../importStyle.css';

export default function NavBar (props) {
    
    let allCycles = props.cycles;
    allCycles.sort(function(a, b){return b-a});

    return (
        <div >
            <Nav onSelect={(eventKey)=>props.onSelect(eventKey)} >
                <Nav.Item >
                    <Nav.Link onClick={()=>{props.onClick()}} > התנתק </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="profile"> פרופיל </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="feed"> עדכונים </Nav.Link>
                </Nav.Item>
                <Nav.Item className="secondNavItem">
                    <Nav.Link eventKey={props.currentCycle}>מחזור {allCycles.length-allCycles.indexOf(parseInt(props.currentCycle))} </Nav.Link>
                    <NavDropdown id="nav-dropdown" className="inlineDropmenu">
                    {allCycles.map((id,i)=>{
                        return(
                            <NavDropdown.Item eventKey={id} key={i} >מחזור {allCycles.length-i}</NavDropdown.Item>
                        );
                    })}
                    </NavDropdown>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="league" > טבלת ליגה </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}                


