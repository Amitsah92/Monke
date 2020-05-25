import React, {useState} from 'react';
import './App.css';
import { Route, Switch ,Router} from 'react-router-dom';
import CustomNavBar from './Containers/Header/CustomNavBar';
import login from './Containers/Login/Login';
import Home from './Containers/Header/Home';
import About from './Containers/Header/About';
import RegistorForm from './Containers/Login/RegistorForm';
import AddQuestion from './Components/addQuestion';
import {UserContext} from './context';
import history from "./history";
import createMonkTest from "./Components/createMonkeTest";
import privateQuiz from "./Components/privateQuiz";
import Footer from "./Containers/Header/Footer";
import dashboard from "./Components/dashboard";


export default function App(){
  const [user, setUser] = useState({ userId: 0,loggedUser: '' ,fullName:"", email:"" , isLoggedIn: false});
  const userContextValue={
    user,
    setUser
  }
    return (
      <Router history={history}>
        <UserContext.Provider value= {userContextValue}>
          <CustomNavBar/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/About' component={About}/>
            <Route path='/Login' component={login} />
            <Route path='/RegistorForm' component={RegistorForm}/>
            <Route path='/AddQuestion' component={AddQuestion}/>
            <Route path='/Dashboard' component={dashboard}/>
            <Route path='/CreateMonkTest' component={createMonkTest}/>
            <Route Path='/PrivateQuiz' component={privateQuiz}/>
          </Switch>
          <Footer/>
        </UserContext.Provider>
      </Router>
    );
}