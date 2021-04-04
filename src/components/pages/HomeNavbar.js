import React from 'react';
import {NavDropdown, Nav} from 'react-bootstrap';
import '../../style.css';
import '../../importStyle.css';

export default function HomeNavbar (props) {
    
    let adminTab =  <Nav.Item >
                        <Nav.Link eventKey="adminPage"> דף ניהול ליגה </Nav.Link>
                    </Nav.Item>;
    let createLeague = <></>;
    if (props.isAdmin === 0){
        adminTab = <Nav.Item >
        <Nav.Link disable>  </Nav.Link>
                    </Nav.Item>;;
        createLeague = <NavDropdown.Item eventKey="create" > פתח ליגה חדשה כאדמין </NavDropdown.Item>
    }
    
    return (
        
        <div >
            <Nav onSelect={(eventKey)=>props.onSelect(eventKey)} >
                <Nav.Item >
                    <Nav.Link eventKey={props.leagueID} > עמוד בית </Nav.Link>
                </Nav.Item>
                <NavDropdown title="החלף ליגה" id="nav-dropdown">
                    {props.leagues.map((id,i)=>{
                        return(
                            <NavDropdown.Item eventKey={id} key={i} >ליגה {id}</NavDropdown.Item>
                        );
                        })
                    }
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="join" > הצטרף לליגה קיימת</NavDropdown.Item>
                    {createLeague}
                </NavDropdown>
                <Nav.Item>
                    <Nav.Link eventKey="profilePage"> פרופיל (בהכנה) </Nav.Link>
                </Nav.Item>
                {adminTab}
                <Nav.Item >
                    <Nav.Link onClick={()=>{props.onClick()}} >התנתק  </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}                


