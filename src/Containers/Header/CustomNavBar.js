import React , {useContext} from 'react';
import "./CustomNavBar.css";
import {Navbar, Nav, Button, Form} from "react-bootstrap";
import { UserContext } from '../../context';

export default function CustomNavBar(){
    const {user, setUser} = useContext(UserContext);
    console.log(user.isLoggedIn);

    return(
        <Navbar default collapseOnSelect>
            <Navbar.Brand href="/">MONKE </Navbar.Brand> 
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href = "/">Home</Nav.Link>
                    <Nav.Link href="/About">About</Nav.Link>
                </Nav>
                <Form inline>
                    {!user.isLoggedIn &&
                    <div>
                    <Button href="./RegistorForm" variant="outline-dark" size = "sm" className="mr-sm-2">Signup</Button>
                    <Button href="./Login" variant="outline-dark" size = "sm">Login</Button>
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