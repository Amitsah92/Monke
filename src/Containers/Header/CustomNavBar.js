import React , {useContext} from 'react';
import "./CustomNavBar.css";
import {Navbar, Nav, Button, Form} from "react-bootstrap";
import { UserContext } from '../../context';
import {NavLink} from 'react-router-dom';

const CustomNavBar=(props)=>{
    const {user, setUser} = useContext(UserContext);
    const {history}=props;
    return(
        <Navbar default collapseOnSelect>
            <Navbar.Brand href="/">MONKE</Navbar.Brand> 
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                 <Nav className="mr-auto">
                    <NavLink to = "/" style={{color: "black", padding: "10px"}} key="home">Home</NavLink>
                    <NavLink to="/About" style={{color: "black", padding: "10px"}} key="about">About</NavLink>
                    </Nav>
                <Form inline>
                    {!user.isLoggedIn &&
                    <div >
                    <Button style={{background:"white", margin: "10px"}}>
                        <NavLink to="/RegistorForm" key={1}>Signup</NavLink>
                    </Button>
                    <Button style={{background:"white", margin: "10px"}}>
                        <NavLink to="/Login" key={2}>Login</NavLink>
                    </Button>
                    </div>
                    }
                    {user.isLoggedIn && 
                    <div>
                        <Nav className="mr-auto">
                        <Nav.Link>LoggedIn</Nav.Link>
                        <Button onClick = {() => {setUser({isLoggedIn : false , loggedUser:''})}} variant="outline-dark" size = "sm">Logout</Button>
                        </Nav>
                    </div>
                    }
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default CustomNavBar;