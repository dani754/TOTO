
import React from 'react';
import {NavDropdown, Nav} from 'react-bootstrap';
import '../../style.css';
import '../../importStyle.css';

export default function HomeNavbar (props) {
    
    let adminTab =  <Nav.Item >
                        <Nav.Link eventKey="adminPage"> Admin Page </Nav.Link>
                    </Nav.Item>;
    let createLeague = <></>;
    if (props.isAdmin === 0){
        adminTab = <Nav.Item >
        <Nav.Link disable>  </Nav.Link>
                    </Nav.Item>;;
        createLeague = <NavDropdown.Item eventKey="create" >open new league</NavDropdown.Item>
    }
    
    return (
        
        <div >
            <Nav onSelect={(eventKey)=>props.onSelect(eventKey)} >
                <Nav.Item >
                    <Nav.Link eventKey={props.leagueID} > Home </Nav.Link>
                </Nav.Item>
                <NavDropdown title="change league" id="nav-dropdown">
                    {props.leagues.map((id,i)=>{
                        return(
                            <NavDropdown.Item eventKey={id} key={i} >league {id}</NavDropdown.Item>
                        );
                        })
                    }
                    <NavDropdown.Divider />
                    <NavDropdown.Item eventKey="join" >Join new league</NavDropdown.Item>
                    {createLeague}
                </NavDropdown>
                <Nav.Item>
                    <Nav.Link eventKey="profilePage"> Profile Page </Nav.Link>
                </Nav.Item>
                {adminTab}
                <Nav.Item >
                    <Nav.Link onClick={()=>{props.onClick()}} >logOut </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}                


