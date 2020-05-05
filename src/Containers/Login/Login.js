import React , {useContext, useState} from 'react'
import { Col,Button, Form, FormGroup,Input,Spinner} from 'reactstrap';
import {Image} from 'react-bootstrap';
import axios from 'axios';
import Home from '../Header/Home';
import {UserContext} from '../../context';
import {useHistory} from 'react-router-dom';
import './login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEye, faEyeSlash, faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'

const Login = (props) =>{
    const[loading, setLoading] = useState(false);
    const[visible, setVisible] = useState(false);
    const[loginFailed, setLoginFailed] = useState(false);
    const history = useHistory();
    const {user, setUser} = useContext(UserContext);
    //const {history}=props
    const onFormSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(e.target);
        const user = {
            userName: data.get('username'),
            passWord: data.get('password')
        };
        console.log(JSON.stringify(user));
        const url = 'https://floating-badlands-28885.herokuapp.com/user/login'
        const headers = {
            'Content-Type': 'apllication/json'
        }
        axios.post(url,user, headers)
        .then(res => {
            console.log(res.data);
            if(res.data === 0){
                setLoginFailed(true);
            }
            else{
                alert('Logged In. Welcome to Monke.')
                setUser({loggedUser: data.get('username') , isLoggedIn : true});
                if(props.page){
                    history.push(props.page);
                }
                else{
                    history.push("/");
                }
            }
            setLoading(false);
        });
    }

    const handleEyeIconClick = (e) =>{
        setVisible(!visible);
    }

    const handleFormClick = (e) => {
        setLoginFailed(false);
    }
        return (
            <div>
                {user.isLoggedIn?  <Home/>:
                <div className='wrapper-background'>
                    <div className='form-wrapper-lg'>
                        <Form  onSubmit ={onFormSubmit} className='custom-form-lg' onClick={handleFormClick}>
                            <FormGroup row>
                                <Col sm={12}>
                                    <Image className="image-login-user" src="Assets/loginImage.png"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginBottom:30}}>
                                <Col sm={12}>
                                    <h4 className='login-h4'>User Login</h4>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={12} className='username-col'>
                                    <Input type="text" name="username" id="Username" placeholder="Type Your Username"/>
                                    <i><FontAwesomeIcon icon={faUser}/></i>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={12} className='password-col'>
                                    <Input type={visible? "text":"password"} name="password" id="Password" placeholder="Type Your Password" />
                                    <i><FontAwesomeIcon icon={faLock}/></i>
                                    {visible?
                                    <b><FontAwesomeIcon icon={faEyeSlash} onClick={handleEyeIconClick}/></b>:
                                    <b><FontAwesomeIcon icon={faEye} onClick={handleEyeIconClick}/></b>}
                                </Col>
                            </FormGroup>
                            {loginFailed &&
                            <FormGroup row>
                                <Col sm={12} className='login-failed'>
                                    <i><FontAwesomeIcon icon={faExclamationTriangle}/> Login failed.</i>
                                </Col>
                            </FormGroup>}
                            <FormGroup row>
                                <Col sm={12}>
                                    <Button type='submit' className='login-button' disabled={loading}>
                                        {loading? <span>logging in... <Spinner size="sm"  color="primary" /></span>:<span>Login</span> }
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                        <h6 className='login-h6'>Have not account yet?</h6>
                        <Button className='signup-btn' color="link" href="/RegistorForm"><b>SIGN UP</b></Button>
                    </div>
                </div>  
                }  
            </div>
        )   
}

export default Login;