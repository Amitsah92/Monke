import React, {useContext, useState} from 'react';
import axios from 'axios';
import { UserContext } from '../context';
import './createMonkeTest.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import  Login from '../Containers/Login/Login';
import {Image} from 'react-bootstrap';

export default function CreateMonkTest(){
    const[selectedDate, setSelectedDate] = useState(null);
    const [quizValue, setQuizValue] = useState({ id: '' , password: '', success: false});
    const {user} = useContext(UserContext);
    const onFormSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const quiz = {
            title: data.get('title'),
            noOfQuestion: data.get('noOfQuestion'),
            difficultyLevel: data.get('difficultyLevel'),
            testType: data.get('type'),
            includedQueston: data.get('includedQuestion'),
            expiryDate: data.get('yourSelectedDate'),
            quizDuration: data.get('quizDuration'),
            quizOwner: user.userId
        };
        console.log(JSON.stringify(quiz));
        const url = 'https://floating-badlands-28885.herokuapp.com/quiz' 
        const headers = {
            'Content-Type': 'apllication/json'
        }
        axios.post(url, quiz , headers)
        .then(res => {
            console.log(res.data);
            console.log(res.statusText);
            console.log(res.data.id);
            if(res.data.Id !== undefined){
                setQuizValue({id: res.data.Id , password: res.data.password, success: true});
            }
            else{
                alert('Please eneter all required data.')
            }
        })
    }

    const handleClick = (e) => {
        e.preventDefault();
        setQuizValue({id: '' , password: '', success: false});
    }

    return(
        <div>
            {quizValue.success?
            <div className="wrapper-sc">
                <div className="bg-form-wrapper">
                <form className="custom-form-sc" onSubmit ={onFormSubmit}>
                <h4 className="QuizIdPaassword-h4">
                    Quiz created successfully.
                    <Image className="image-custom" src="Assets/greentick.png"/>
                </h4>
                <div className="title">
                    <label className="label-1">Quiz Id: <b><u>{quizValue.id}</u></b></label>
                    <label className="label-1">Quiz Password: <b><u>{quizValue.password}</u></b></label>
                </div>
                <h6 className="QuizIdPaassword-h6"><b>Note: </b>Please save quiz <b>ID </b> and <b>Password</b> for future use.</h6>
                <div className="sumbitQuestion">
                    <button onClick={handleClick}>Ok</button>
                </div>
                </form>
                </div>
            </div>:
            <div>
            {user.isLoggedIn?
            <div className="wrapper">
                <div className="form-wrapper">
                    <h1 className="custom-h1">Create Test</h1>
                    <form className="custom-form" onSubmit ={onFormSubmit}>
                        <div className="title">
                        <label>Title:</label>
                        <input
                        placeholder="Descriptive title for the quiz."
                        type="text"
                        name="title"
                        />
                        </div>
                        <div className="noOfQuestion">
                        <label>Number of Question:</label>
                        <select name='noOfQuestion'>
                            <option value="25">25</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                            <option value="75">75</option>
                            <option value="100">100</option>
                        </select>
                        </div>
                        <div className="difficulty">
                        <label>Dificulty Level:</label>
                        <select name='difficultyLevel'>
                            <option value="Easy">Easy</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Hard">Hard</option>
                        </select>
                        </div>
                        <div className="noOfQuestion">
                        <label>Test type:</label>
                        <select name='type'>
                            <option value="private">Private</option>
                            <option value="public">Public</option>
                        </select>
                        </div>
                        <div className="difficulty">
                        <label>Include Question:</label>
                        <select name='includedQuestion'>
                            <option value="all">ALL</option>
                            <option value="mine">Only uploaded by me</option>
                        </select>
                        </div>
                        <div className="noOfQuestion">
                        <label>Test Expiry Date: </label>
                        <DatePicker 
                        className="cos-datepicker" 
                        name = 'yourSelectedDate'
                        selected={selectedDate} 
                        onChange={date => setSelectedDate(date)}
                        dateFormat='yyyy/MM/dd'
                        minDate={new Date()}
                        isClearable
                        showYearDropdown
                        scrollableYearDropdown
                        />
                        </div>
                        <div className="difficulty">
                        <label>Quiz duration: </label>
                        <input
                        placeholder="Enter quiz duration in Minutes (> 5 mins and < 180 mins)"
                        type="text"
                        name="quizDuration"
                        />
                        </div>
                        <div className="sumbitQuestion">
                        <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>:<Login page="/CreateMonkTest"/>}
            </div>}
        </div>
    )
}