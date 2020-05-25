import React, {useState} from 'react';
import {Button}  from 'react-bootstrap';
import axios from 'axios';
import './privateQuiz.css';
import QuizPage from './quizPage';


const PrivateQuiz = () => {
    const [validated,setValidated] = useState(false);
    const [quizData, setQuizData] = useState(null);

    const onFormSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        const bodyParams = {
            quizId: data.get('quizId'),
            quizPassword: data.get('quizPassword'),
            testType: "private",
            noOfQuiz: "one"
        };
        
        const headers = {
            'Content-Type': 'apllication/json'
        };

        axios.post('https://floating-badlands-28885.herokuapp.com/quiz/findquiz',bodyParams,headers)
        .then(res => {
            console.log(res.data);
            if(res.data !== null){
                setQuizData(res.data);
                setValidated(true);
            }
        }).catch(err => {
            console.log("Not working. Error message:" + err);
        });
    }

    return(
        <div>
            {validated?
            <div>
                <QuizPage key={2} quizDetails={{...quizData}}/>
            </div>:
            <div className="wrapper-privatequiz">
                <div className="content-wrapper-privatequiz">
                    <form className="custom-form-sc" onSubmit ={onFormSubmit}>
                        <h5 className="credential-h4">
                        Enter Quiz credential.
                        </h5>
                        <div className="fields-pq">
                            <label className="label-pq">Quiz Id:</label>
                            <input className="input-pq" type="text" name="quizId" id="QuizId" placeholder="Enter quiz Id."/>
                            <label className="label-pq">Quiz Password:</label>
                            <input className="input-pq"  type="password" name="quizPassword" id="QuizPassword" placeholder="Enter quiz Password."/>
                            <Button type='submit' className="sumbitCredential">Sumbit</Button>
                        </div>
                    </form>
                </div>
            </div>}
        </div>
    )
}

export default PrivateQuiz;