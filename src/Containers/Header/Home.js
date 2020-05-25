import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { Jumbotron, Container, Button} from 'react-bootstrap';
import './Home.css';
import {Row, Col, Card} from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import cardImg from './quizHome.png';
import QuizPage from '../../Components/quizPage';
import Pagination from '@material-ui/lab/Pagination';

export default function Home(){
    const [quizs, setQuizs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [quizData, setQuizData] = useState(null);
    const [playQuiz, setPlayQuiz] = useState(false);
    const [currentPage, setcurrentPage] = useState(1);
    const [quizPerPage] = useState(12);
    
    useEffect(() =>{
        let isUnmount = true;
        const bodyParams = {
            testType: "public"
        }
        
        const headers = {
            'Content-Type': 'application/json'
        }

        axios.post('https://floating-badlands-28885.herokuapp.com/quiz/findquiz',bodyParams,headers)
        .then(res => {
            console.log(res.data)
            if(isUnmount){
                if(res.data !== null){
                    setQuizs(res.data)
                }
                setLoading(true);
            }
        })
        .catch(err => {
            console.log("Not working. Error message:" + err);
        })

        return () => {
            isUnmount=false;
            console.log("unmounted home page.")
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const indexOfLastQuiz = currentPage * quizPerPage;
    const indexOfFirstQuiz = indexOfLastQuiz - quizPerPage;
    const currentQuizs = quizs.slice(indexOfFirstQuiz,indexOfLastQuiz);

    const handlePageChange = (event , page) => {
        setcurrentPage(page);
    }

    const handleClick = (quiz,e) => {
        e.preventDefault();
        setPlayQuiz(true);
        setQuizData(quiz);
    }

    const handleRollBack = () => {
        setPlayQuiz(false);
    }

    const expiresInDate = (expiryDate) => {
        var expDate = new Date(expiryDate);
        var currentDate = new Date();
        const oneDay = 24 * 60 * 60 * 1000;
        const diffDays = Math.round(Math.abs((expDate - currentDate) / oneDay));
        return <b>{diffDays}</b>
    }
    
    return(
        <div>
            {playQuiz?
            <div>
                <QuizPage key={1} quizDetails={{...quizData}} handleRollBack={handleRollBack}/>
            </div>:
            <div>
                {loading?
                <Container>
                    <Jumbotron className='Jumbotron-Home'>
                        <h1>Welcome to Monke!</h1>
                        <p>A perfect place to test you knowledge.</p>
                        <Link to = "/about">
                            <Button>Read More...</Button>
                        </Link>
                    </Jumbotron>
                    <Row>
                    {currentQuizs.map((quiz,index) =>(
                        <Col lg={4} md={6} sm={12} key={index}>
                            <Card key={index} style={{ width: '100%' , marginBottom:"30px"}}>
                                <Card.Img variant="top" src={cardImg} />
                                <Card.Header><b>{quiz.title}</b></Card.Header>
                                <Card.Body>
                                    <Card.Text>Difficulty Level: <b>{quiz.difficultyLevel}</b></Card.Text>
                                    <Card.Text>Quiz Duration: <b>{quiz.quizDuration}</b></Card.Text>
                                    <Card.Text>Total number of Questions: <b>{quiz.noOfQuestion}</b></Card.Text>
                                    <Button variant="primary" onClick ={(e) => handleClick(quiz, e)}>Play Quiz</Button>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Expires in {expiresInDate(quiz.expiryDate)} Days.</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                    </Row>
                    <Row className="justify-content-md-center">
                        <Pagination count={Math.ceil(quizs.length/quizPerPage)} showFirstButton showLastButton onChange={handlePageChange}/>
                    </Row>
                </Container>:
                <div className="spinner-load">
                    <FontAwesomeIcon size="4x" color="green" icon={faSpinner} pulse/>
                </div>}
            </div>
            }
        </div>
    )
}