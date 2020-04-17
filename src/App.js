import React, {useState, useMemo} from 'react';
import './App.css';
import { Route, Switch , BrowserRouter} from 'react-router-dom';
import CustomNavBar from './Containers/Header/CustomNavBar';
import login from './Containers/Login/Login';
import Home from './Containers/Header/Home';
import About from './Containers/Header/About';
import RegistorForm from './Containers/Login/RegistorForm';
import AddQuestion from './Components/addQuestion';
import {UserContext} from './context';

export default function App(){
  const [user, setUser] = useState({ loggedUser: '' , isLoggedIn: false});
  const userValue = useMemo(() => ({user, setUser}), [user, setUser]);
  console.log(user.isLoggedIn);

    return (
      <BrowserRouter>
        <UserContext.Provider value= {userValue}>
          <CustomNavBar/>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/About' component={About}/>
            <Route path='/Login' component={login} />
            <Route path='/RegistorForm' component={RegistorForm}/>
            <Route path='/AddQuestion' component={AddQuestion}/>
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    );
}