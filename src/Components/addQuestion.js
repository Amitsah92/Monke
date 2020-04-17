import React, {useContext, useEffect, useState} from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {Jumbotron} from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../context';
import  Login from '../Containers/Login/Login';

export default function AddQuestion(){
    const [yourQuestion, setYourQuestion] = useState([]);
    const {user} = useContext(UserContext);
    console.log(user.loggedUser)
    var resData = [] 

    useEffect(() =>{
        const bodyParams = {
            Uploadedby: user.loggedUser
        }
    
        const header = {
            'Content-Type': 'application/json'
        }

        axios.post('http://localhost:9000/question/Questions', bodyParams, header)
        .then(res => {
            console.log(res.data)
            setYourQuestion(res.data)
            console.log(yourQuestion)
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    const onFormSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        var Answer = data.get('answerSelect');
        if(Answer === 'Option1')
            Answer = data.get('option1');
        else if(Answer === 'Option2')
            Answer = data.get('option2');
        else if(Answer === 'Option3')
            Answer = data.get('option3');
        else
            Answer = data.get('option4');

        const question = {
            question: data.get('question'),
            option1: data.get('option1'),
            option2: data.get('option2'),
            option3: data.get('option3'),
            option4: data.get('option4'),
            answer: Answer,
            difficulty: data.get('dificultyLevel'),
            Uploadedby: user.loggedUser
        }
        console.log(JSON.stringify(question));
        const url = 'http://localhost:9000/question' 
        const headers = {
            'Content-Type': 'apllication/json'
        }
        axios.post(url, question , headers)
        .then(res => {
            if (res.data === "1"){
                console.log(res.data);
                console.log(res.status);
                console.log(res.statusText);
                console.log(res.headers);
                console.log(res.config);
                alert('Question uploaded');
            }
            else{
                alert(res.data);
            }
        });

        axios.post(url + '/Questions', question, headers)
        .then(res => {
            if(res.data === "0"){
                alert("oops something went wrong.")
            }
            else{
                resData = res.data
                console.log(res.config);
                console.log(resData);
            }
        });
    }

    if(user.isLoggedIn){
        return(
            <Container fluid>
                <Row>
                    <Col>
                        <Jumbotron style={{ marginTop: 15}}>
                            <Form  onSubmit ={onFormSubmit} style={{ marginLeft: 50}}>
                                <FormGroup row>
                                    <Label for="Question" sm={1}>Question</Label>
                                    <Col sm={11}>
                                        <Input type="text" name="question" id="question" placeholder="Enter question" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="Option1" sm={1}>Option1</Label>
                                    <Col sm={5}>
                                        <Input type="text" name="option1" id="Option1" placeholder="Enter first option" />
                                    </Col>
                                    <Label for="Option2" sm={1}>Option2</Label>
                                    <Col sm={5}>
                                        <Input type="text" name="option2" id="Option2" placeholder="Enter second option" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="Option3" sm={1}>Option3</Label>
                                    <Col sm={5}>
                                        <Input type="text" name="option3" id="Option3" placeholder="Enter third option" />
                                    </Col>
                                    <Label for="Option4" sm={1}>Option4</Label>
                                    <Col sm={5}>
                                        <Input type="text" name="option4" id="Option4" placeholder="Enter fourth option" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="AnswerSelect" sm={1}>Answer</Label>
                                    <Col sm={5}>
                                        <Input type="select" name="answerSelect" id="AnswerSelect">
                                            <option>Option1</option>
                                            <option>Option2</option>
                                            <option>Option3</option>
                                            <option>Option4</option>
                                        </Input>
                                    </Col>
                                    <Label for="Dificulty" sm={1}>Dificulty Level</Label>
                                    <Col sm={5}>
                                    <Input type="select" name="dificultyLevel" id="DificultyLevel">
                                            <option>Easy</option>
                                            <option>Moderate</option>
                                            <option>Hard</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col sm={12}>
                                        <Button type='submit' size="lg" block>Submit</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Jumbotron>
                        <Jumbotron>
                            <Row style={{ marginLeft: 50}}>
                                <h4>List of all available question.</h4>
                            </Row>
                            {yourQuestion.map((eachQuestion, index) =>{
                                return <div>
                                    <p><b>Q. </b>{eachQuestion.question}</p>
                                    <p>{eachQuestion.option1}</p>
                                    <p>{eachQuestion.option2}</p>
                                    <p>{eachQuestion.option3}</p>
                                    <p>{eachQuestion.option4}</p>
                                </div>
                            })
                            }
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        )
    }
    else{
        return(
            <div>
                <Login/>
            </div>
        )
    }
}