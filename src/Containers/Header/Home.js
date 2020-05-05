import React, { useContext} from 'react';
import {Link} from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Button} from 'react-bootstrap';
import './Home.css';
import {UserContext} from '../../context';

export default function Home(){
    const {user} = useContext(UserContext);
    console.log(user.loggedUser)

        return(
            <Container>
                <Jumbotron className='Jumbotron-Home'>
                    <h1>Welcome to Monke!</h1>
                    <p>A perfect place to practice for all of your examination.</p>
                    <Link to = "/about">
                        <Button>Read More...</Button>
                    </Link>
                </Jumbotron>
                <Row style={{margin: 25}}>
                    <Col xs={3}>
                    <Jumbotron style={{textAlign: 'center'}}>
                    <h3>Add a question</h3>
                    {user.isLoggedIn === true &&
                        <div>
                            <Link to = "/AddQuestion">
                            <Button>Add</Button>
                            </Link>
                        </div>
                    }
                    {user.isLoggedIn === false &&
                        <div>
                            <Link to = "/Login">
                            <Button>Add</Button>
                            </Link>
                        </div>
                    }
                    </Jumbotron>
                    </Col>
                    <Col xs={3}>
                    <Jumbotron style={{textAlign: 'center'}}>
                    <h3>Create your own test.</h3>
                    <div>
                        <Link to = "/CreateMonkTest">
                        <Button>Add</Button>
                        </Link>
                    </div>
                    </Jumbotron>
                    </Col>
                    <Col xs={3}>
                    <Jumbotron style={{textAlign: 'center'}}>
                    <h3>View your test result.</h3>
                    </Jumbotron>
                    </Col>
                    <Col xs={3}>
                    <Jumbotron style={{textAlign: 'center'}}>
                    <h3>Manage you test.</h3>
                    </Jumbotron>
                    </Col>
                </Row>
            </Container>
        )
}