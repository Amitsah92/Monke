import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../context';
import axios from 'axios';
import './quizPage.css';
import Paginate from './paginate';
import {FormControl,FormLabel,RadioGroup,FormControlLabel,Button, Radio} from '@material-ui/core';
import {Button as Btnrb}  from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import QuizTimer from './quizTimer';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(1, 1, 0, 0),
    },
  }));

export default function QuizPage(){
    const classes = useStyles();
    const {user} = useContext(UserContext);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setcurrentPage] = useState(1);
    const [questionPerPage] = useState(5);
    const [currectAnsweredQuestion, setcurrectAnsweredQuestion] = useState([]); //contanis id of correctly answered question
    const [allAnsweredQuestion, setAllAnsweredQuestion] = useState([]); //contanis id of all answered question
    const [instructionFlag, setInstructionFlag] = useState(false);
     
    useEffect(() =>{
        const bodyParams = {
            Uploadedby: user.loggedUser
        }
    
        const header = {
            'Content-Type': 'application/json'
        }
        
        setLoading(true);

        axios.get('http://localhost:9000/question/questions', bodyParams, header)
        .then(res => {
            console.log(res.data)
            setQuestions(res.data);
            setLoading(false);
        })
        .catch(err => {
            console.log(err)
        })
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const indexOfLastQuestion = currentPage * questionPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion,indexOfLastQuestion);

    const paginateHandler = pageNumber => {
        if(pageNumber >= 1 && pageNumber <= (questions.length/questionPerPage)){
            setcurrentPage(pageNumber);
        }
    }

    //on Individial question submit
    const onAnswerSubmit = (realAnswer,questionId, e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const givenAnswer = data.get('givenAnswer');
        const temp = currectAnsweredQuestion;
        const temp1 = allAnsweredQuestion;
        temp1.push(questionId);
        setAllAnsweredQuestion(temp1);
        console.log(allAnsweredQuestion);
        if(givenAnswer === realAnswer && temp.indexOf(questionId) === -1){
            temp.push(questionId);
            setcurrectAnsweredQuestion(temp);
        }
        else if(temp.indexOf(questionId) >= 0){
            temp.pop(questionId);
            setcurrectAnsweredQuestion(temp);
        }
    }

    const handlePlayEvent = () => {
        setInstructionFlag(true);
    }

    return(
        <div>
            {instructionFlag? <div className="wrapper-qp">
            <div className="content-wrapper-timer">
                <QuizTimer/>
            </div>
            <div className='content-wrapper-qp'>
                <row>
                    <h5 className="quizpage-h5"><b>Answered  record</b></h5>
                    {questions.map((question, index) =>(
                        <button className={(allAnsweredQuestion.indexOf(question._id) === -1)? "button-question":"button-question-answered"}>
                            <span><b>Q.{index+1}</b></span>
                        </button>
                    ))}
                </row>
            </div>
            <div className='question-wrapper-qp'>
                {loading?
                <div>
                    <h1>Loading...</h1>
                </div>:
                <div className='container mt-5'>
                    <h3>ReactJs Concept Quiz</h3>
                    <ul className="list-group mb-4">
                    {currentQuestions.map((question, index) =>(
                        <form  onSubmit ={(e) => onAnswerSubmit(question.answer,question._id, e)} key={questions._id}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend"><h5><b>Q.{currentPage*questionPerPage+index-questionPerPage+1}</b> {question.question}</h5></FormLabel>
                                <RadioGroup aria-label="givenAnswer" name="givenAnswer">
                                    <FormControlLabel value={question.option1}  control={<Radio />} label={question.option1} />
                                    <FormControlLabel value={question.option2}  control={<Radio />} label={question.option2} />
                                    <FormControlLabel value={question.option3}  control={<Radio />} label={question.option3} />
                                    <FormControlLabel value={question.option4}  control={<Radio />} label={question.option4} />
                                </RadioGroup>
                                <Button type="submit" variant="outlined" color="primary" className={classes.button}>
                                Sumbit Answer
                                </Button>
                            </FormControl>
                        </form>
                    ))}
                    </ul>
                    <Button variant="outlined" color="primary" className={classes.button}>Sumbit Test</Button>
                    <Paginate 
                        questionPerPage={questionPerPage} 
                        totalQuestion={questions.length} 
                        paginateHandler={paginateHandler} 
                        currentPage={currentPage}/>
                </div>}
            </div>
        </div>:
        <div className="wrapper-instruction">
            <div className="instruction-box">
                <h1 className='quizpage-h5'>How to play the Quiz?</h1>
                <row>
                    <h6><b>Ensure you read this guide and instruction from start to end.</b></h6>
                    <h6><b>1.</b> Each quiz has a limited time. You must finish and sumbit the quiz with in given time limit.</h6>
                    <h6><b>2.</b> The quiz will be automatically submitted as soon as your time elapses.</h6>
                    <h6><b>3.</b> After selecting your answer you must submit each question's answer Individially.</h6>
                    <h6><b>4.</b> Unsumbitted question's answer will not be considered while calculating quiz final score.</h6>
                    <h6><b>5.</b> You can change your answer multiple time.The final selected answer will be considered while calculating quiz final score.</h6>
                    <h6><b>6.</b> Answer can be changed even after submitting the answer</h6>
                    <h6><b>7.</b> Each question contains 4 options and anyone of them would be corect answer</h6>
                    <h6><b>8.</b> Question numbers in red and green color can be seen at left side of the screen. These represents unanswered and answered question respectively.</h6>
                    <h6><b>9.</b> Answer can be changed even after submitting the answer.</h6>
                    <Link to="/">
                        <Btnrb className='button-tmb'>Take me back</Btnrb>
                    </Link>
                    <Btnrb className="button-pq" onClick={handlePlayEvent}>Play quiz</Btnrb>
                </row>
            </div>
        </div>}
        </div>
    )
}