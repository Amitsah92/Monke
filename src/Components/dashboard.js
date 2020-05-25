import React, {useContext, useEffect, useState} from 'react';
import { UserContext } from '../context';
import axios from 'axios';
import './dashboard.css';
import {Image, Row, Card, Col,Button} from 'react-bootstrap';
import Table from './quizResult' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import  Login from '../Containers/Login/Login';

export default function Dashboard(){
    const {user, setUser} = useContext(UserContext);
    const [quizs, setQuizs] = useState([]);
    const [unEdit, setunEdit] = useState(false);
    const [mailEdit, setMailEdit] = useState(false);
    const [pwEdit, setPwEdit] = useState(false);

    useEffect(() =>{
        const bodyParams = {
            Uploadedby: user.userId,
            testType: "private",
            noOfQuiz:"all"
        }
    
        const header = {
            'Content-Type': 'application/json'
        }

        axios.post('http://localhost:9000/quiz/findquiz', bodyParams, header)
        .then(res => {
            console.log(res.data);
            setQuizs(res.data);
        })
        .catch(err => {
            console.log(err)
        })

        return () => {
            console.log("unmounted dashboard");
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleUserNameEdit = () =>{
        setunEdit(!unEdit);
    }

    const handlePassWordEdit = () =>{
        setPwEdit(true);
    }

    const handleEmailEdit = () => {
        setMailEdit(!mailEdit);
    }

    const handleCancle = () => {
        setunEdit(false);
        setPwEdit(false);
        setMailEdit(false);
    }

    const onFormSubmit = (e) =>{
        e.preventDefault();
        const data = new FormData(e.target);
        if(pwEdit && data.get('nPassword') !== data.get('cnPassword')){
            alert("new password and confirm new password mismatch");
            return;
        }
        if((data.get('username') !== null && user.loggedUser !== data.get('username')) 
            || (data.get('email') !== null && user.email !== data.get('email')) 
            || pwEdit){

            const update = {
                userId: user.userId,
                userName: (data.get('username') === null)? user.loggedUser:data.get('username'),
                email: (data.get('email') === null)? user.email:data.get('email'),
                oldPassword: data.get('cPassword'),
                newPassword: data.get('nPassword')
            };
            console.log(JSON.stringify(update));

            const url = 'https://floating-badlands-28885.herokuapp.com/user'
            const headers = {
                'Content-Type': 'apllication/json'
            }

            axios.patch(url,update, headers)
            .then(res => {
                if(res.data === 1){
                    setUser({isLoggedIn : false});
                    setunEdit(false);
                    setMailEdit(false);
                    setPwEdit(false);
                }else if(res.data === 0){
                    alert('Entered old Password in incorrect');
                }
                else{
                    console.log("No data modified");
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
        else{
            setunEdit(false);
            setMailEdit(false);
        }
    }

    return(
        <div>
            {user.isLoggedIn?
            <div className="background-dashboard">
                <div className="profile-dashboard">
                    <form className="form-dashboard" onSubmit ={onFormSubmit}>
                    <Row>
                        <Image className="image-login-user" src="Assets/loginImage.png"/>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <h6 className="dashboard-fullname">{user.fullName}</h6>
                        </Col>
                        <Col sm={12} className="usernameedit-col">
                            <input  className={unEdit? "test-input-active":"test-input"} 
                                    type="text" 
                                    name="username" 
                                    id="Username" 
                                    autoComplete="off"
                                    defaultValue= {user.loggedUser} 
                                    disabled={!unEdit}/>
                            <b><FontAwesomeIcon size="lg" icon={faEdit} onClick={handleUserNameEdit}/></b>
                        </Col>
                        <Col sm={12} className="email-col">
                            <input  className={mailEdit? "test-input-active":"test-input"} 
                                    type="text"
                                    name="email" 
                                    id="Email" 
                                    autoComplete="off"
                                    defaultValue= {user.email} 
                                    disabled={!mailEdit}/>
                            <b><FontAwesomeIcon size="lg" icon={faEdit} onClick={handleEmailEdit}/></b>
                        </Col>
                        <Col sm={12}>
                            {((unEdit || mailEdit) && !pwEdit)? <Button type="submit" variant="success" className="button-save">Save</Button>:<div></div>}
                        </Col>
                    </Row>
                    <Row>
                        {pwEdit?
                        <div>
                        <Col sm={12} className="Password-col">
                            <label className="pwlable" for="CPassword">Current Password</label>
                            <input className="text-input" type="password" autocomplete="off" name="cPassword" id="CPassword"/>
                        </Col>
                        <Col sm={12} className="Password-col">
                            <label className="pwlable" for="NPassword">New Password</label>
                            <input className="text-input" type="text" autocomplete="off" name="nPassword" id="NPassword"/>
                        </Col>
                        <Col sm={12} className="Password-col">
                            <label className="pwlable" for="CnPassword">Confirm New Password</label>
                            <input className="text-input" type="password" autocomplete="off" name="cnPassword" id="CnPassword"/>
                        </Col>
                        {(unEdit || mailEdit || pwEdit)? 
                        <Row>
                            <Col sm={6}>
                                <Button type="submit" variant="success" className="button-save">Save</Button>
                            </Col>
                            <Col sm={5}>
                                <Button onClick={handleCancle} variant="success" className="button-save">Cancle</Button>
                            </Col>
                        </Row>:
                        <div></div>}
                        </div>:
                        <Col sm={12}>
                            <Button onClick={handlePassWordEdit} variant="success" className="button-reset-password">Reset Password</Button>
                        </Col>}
                    </Row>
                    </form>
                </div>
                <div className="quiz-dashboard"> 
                {quizs.map((quiz,index) =>(
                <Card className="text-center" key={index}>
                    <Card.Header as="h5">{quiz.title} (QuizId: {quiz.quizId})</Card.Header>
                    <Card.Body>
                        <Table quizId={quiz._id}/>
                    </Card.Body>
                </Card>
                ))}
                </div>
            </div>:<Login />}
        </div>
    )
}