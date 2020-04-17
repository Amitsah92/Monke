import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {Image, Jumbotron} from 'react-bootstrap';
import axios from 'axios';

const RegistorForm = (props) => {
    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(e.target)
        const data = new FormData(e.target);
        if(data.get('password') === data.get('confirmPassword')){
            if(data.get('name') ==='' || data.get('username') ==='' || data.get('email') === '' || data.get('password') === ""){
                alert('Please enter all fields.');
            }
            const user = {
                fullName: data.get('name'),
                userName: data.get('username'),
                email: data.get('email'),
                passWord: data.get('password')
            }
            console.log(JSON.stringify(user));
            const url = 'http://localhost:9000/user' 
            const headers = {
                'Content-Type': 'apllication/json'
            }

            axios.get(url, user, headers)
            .then(res => {
                console.log(res.data);
                if(res.data !== 0){
                    alert('Username or Email already registered.');
                }
                else{
                    console.log(res.config);
                    axios.post( url , user, headers)
                    .then(res => {
                        if (res.data === "1"){
                            console.log(res.data);
                            console.log(res.status);
                            console.log(res.statusText);
                            console.log(res.headers);
                            console.log(res.config);
                            alert('Signup Sueccessful');
                        }
                        else{
                            alert(res.data);
                        }
                    });
                }
            });
            
        }
        else{
            alert('Password don\'t match');
        }
    }

    return(
        <Container>
            <Row style={{margin: 50}}>
                <Col xs={6}>
                        <Image src="Assets/RegistrationPic.jpeg" thumbnail />   
                </Col>
                <Col xs={6}>
                    <Jumbotron>
                        <Form  onSubmit ={onFormSubmit} style={{ marginLeft: 50}}>
                            <FormGroup row>
                                <Label for="Name" sm={3}>Name</Label>
                                <Col sm={8}>
                                    <Input type="text" name="name" id="Name" placeholder="Enter name" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="Username" sm={3}>Username</Label>
                                <Col sm={8}>
                                    <Input type="text" name="username" id="Username" placeholder="Enter username" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="Email" sm={3}>Email</Label>
                                <Col sm={8}>
                                    <Input type="email" name="email" id="Email" placeholder="Enter Email" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="Password" sm={3}>Password</Label>
                                <Col sm={8}>
                                    <Input type="password" name="password" id="Password" placeholder="password" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="CPassword" sm={3}>Confirm Password</Label>
                                <Col sm={8}>
                                    <Input type="password" name="confirmPassword" id="CPassword" placeholder="password" />
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
    );
}

export default RegistorForm;