import React , {useContext} from 'react'
import {Container, Row, Col,Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {Image, Jumbotron} from 'react-bootstrap';
import axios from 'axios';
import Home from '../Header/Home';
import {UserContext} from '../../context';

const Login=(props)=>{
    const {user, setUser} = useContext(UserContext);
    const {history}=props
    const onFormSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const user = {
            userName: data.get('username'),
            passWord: data.get('password')
        };
        console.log(JSON.stringify(user));
        const url = 'http://localhost:9000/user/login'
        const headers = {
            'Content-Type': 'apllication/json'
        }
        axios.post(url,user, headers)
        .then(res => {
            console.log(res.data);
            if(res.data === 0){
                alert('Username or password is incorrect.');
            }
            else{
                alert('Logged In. Welcome to Monke.')
                setUser({loggedUser: data.get('username') , isLoggedIn : true});
                history.push('/AddQuestion');
            }
        });
    }
        return (
            <div>
                {user.isLoggedIn?  <Home/>: <Container>
                    <Row style={{margin: 50}}>
                    <Col xs={6}>
                        <Image src="Assets/RegistrationPic.jpeg" thumbnail />   
                    </Col>
                    <Col xs={6}>
                        <Jumbotron>
                        <Form  onSubmit ={onFormSubmit} style={{ marginLeft: 60, marginTop: 80, marginBottom:80}}>
                            <FormGroup row>
                                <Label for="Name" sm={3}>Username</Label>
                                <Col sm={8}>
                                    <Input type="text" name="username" id="Username" placeholder="Enter Username" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="Password" sm={3}>Password</Label>
                                <Col sm={8}>
                                    <Input type="password" name="password" id="Password" placeholder="Enter Password" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={8}>
                                    <Button type='submit'>Submit</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                        </Jumbotron>
                    </Col>
                    </Row>
                </Container> 
                }  
            </div>
        )
    
}

export default Login;