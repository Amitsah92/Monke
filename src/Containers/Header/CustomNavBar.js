import React , {useContext} from 'react';
import "./CustomNavBar.css";
import {Navbar, Nav, Button, DropdownButton, Dropdown} from "react-bootstrap";
import { UserContext } from '../../context';
import {NavLink, Link} from 'react-router-dom';

const CustomNavBar=(props)=>{
    const {user, setUser} = useContext(UserContext);

    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <NavLink className="navlink-cos" to="/"><h3>MONKE</h3></NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <NavLink className="navlink-about" to="/About" key="about">About</NavLink>
                <NavLink className="navlink-about" to="/privateQuiz" key="privateQuiz">Private_Quiz</NavLink>
            </Nav>
            <Nav>
                {user.isLoggedIn?
                <Nav className="mr-auto">
                    <DropdownButton title={user.loggedUser} id="dropdown-item-button" style={{margin:"10px"}}>
                        <Dropdown.Item 
                            as={Link} 
                            eventKey={"1"} 
                            to = "/AddQuestion" 
                            style={{color: "black", textDecoration:"none"}}>
                            Add question
                        </Dropdown.Item>
                        <Dropdown.Item
                            as={Link} 
                            eventKey={"2"} 
                            to = "/CreateMonkTest" 
                            style={{color: "black",textDecoration:"none"}}>
                            Host Quiz
                        </Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item
                            as={Link} 
                            eventKey={"3"} 
                            to = "/dashboard" 
                            style={{color: "black",textDecoration:"none"}}>
                            Dashboard
                        </Dropdown.Item>
                    </DropdownButton>
                    <Button style={{ margin: "10px"}} onClick = {() => {setUser({isLoggedIn : false , loggedUser:''})}}>
                        <NavLink style={{color: "white",textDecoration:"none"}} to="/Login" key={2}>Logout</NavLink>
                    </Button>
                </Nav>:
                <Nav className="mr-auto">
                    <Button style={{margin: "10px"}}>
                        <NavLink style={{color: "white",textDecoration:"none"}} to="/Login" key={2}>Login</NavLink>
                    </Button>
                </Nav>}
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default CustomNavBar;