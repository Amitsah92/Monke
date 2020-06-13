import React, { useState } from "react";
import "./App.css";
import { Route, Switch, Router } from "react-router-dom";
import CustomNavBar from "./Containers/Header/CustomNavBar";
import login from "./Containers/Login/Login";
import Home from "./Containers/Header/Home";
import About from "./Containers/Header/About";
import RegistorForm from "./Containers/Login/RegistorForm";
import AddQuestion from "./Components/addQuestion";
import { UserContext } from "./context";
import history from "./history";
import createMonkTest from "./Components/createMonkeTest";
import privateQuiz from "./Components/privateQuiz";
import Footer from "./Containers/Header/Footer";
import dashboard from "./Components/dashboard";

export default function App() {
  let tokenUser = JSON.parse(localStorage.getItem("user"));
  var saved_userId = 0,
    saved_loggedUser = "",
    saved_fullName = "",
    saved_email = "",
    saved_isLoggedIn = false;
  if (tokenUser !== null) {
    saved_userId = tokenUser.userId;
    saved_loggedUser = tokenUser.loggedUser;
    saved_fullName = tokenUser.fullName;
    saved_email = tokenUser.email;
    saved_isLoggedIn = tokenUser.isLoggedIn;
  }

  const [user, setUser] = useState({
    userId: saved_userId,
    loggedUser: saved_loggedUser,
    fullName: saved_fullName,
    email: saved_email,
    isLoggedIn: saved_isLoggedIn,
  });
  const userContextValue = {
    user,
    setUser,
  };

  return (
    <Router history={history}>
      <UserContext.Provider value={userContextValue}>
        <CustomNavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/About" component={About} />
          <Route path="/Login" component={login} />
          <Route path="/RegistorForm" component={RegistorForm} />
          <Route path="/AddQuestion" component={AddQuestion} />
          <Route path="/Dashboard" component={dashboard} />
          <Route path="/CreateMonkTest" component={createMonkTest} />
          <Route Path="/PrivateQuiz" component={privateQuiz} />
        </Switch>
        <Footer />
      </UserContext.Provider>
    </Router>
  );
}
