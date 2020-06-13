import React, { useState } from "react";
import { Col, Button, Form, FormGroup, Input, Spinner } from "reactstrap";
import axios from "axios";
import "./registorForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faKey,
  faUserCircle,
  faEnvelope,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const RegistorForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({
    fieldValidation: false,
    uniqueValidation: false,
    apiResponse: false,
    passwordMatch: false,
    registrationFailed: false,
  });
  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    const data = new FormData(e.target);
    if (data.get("password") === data.get("confirmPassword")) {
      if (
        data.get("name") === "" ||
        data.get("username") === "" ||
        data.get("email") === "" ||
        data.get("password") === ""
      ) {
        setValidation({ fieldValidation: true, registrationFailed: true });
        return;
      }
      setLoading(true);
      console.log(loading);
      const user = {
        fullName: data.get("name"),
        userName: data.get("username"),
        email: data.get("email"),
        passWord: data.get("password"),
      };
      console.log(JSON.stringify(user));
      const url = "https://floating-badlands-28885.herokuapp.com/user";
      const headers = {
        "Content-Type": "apllication/json",
      };

      axios
        .post(url + "/validation", user, headers)
        .then((res) => {
          console.log(res.data);
          if (res.data !== 0) {
            setValidation({ uniqueValidation: true, registrationFailed: true });
            setLoading(false);
          } else {
            axios
              .post(url, user, headers)
              .then((res) => {
                setLoading(false);
                console.log(loading);
                console.log(res.data);
                if (res.data === "1") {
                  //console.log(res.status);
                  //console.log(res.statusText);
                  //console.log(res.headers);
                  //console.log(res.config);
                  alert("Signup Sueccessful");
                } else {
                  setValidation({
                    apiResponse: true,
                    registrationFailed: true,
                  });
                }
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      setValidation({ passwordMatch: true, registrationFailed: true });
    }
  };

  const handleRegistrationFormClick = () => {
    setValidation({
      fieldValidation: false,
      uniqueValidation: false,
      apiResponse: false,
      passwordMatch: false,
      registrationFailed: false,
    });
  };

  return (
    <div className="wrapper-background-rf">
      <div className="form-wrapper-rf">
        <Form onSubmit={onFormSubmit} onClick={handleRegistrationFormClick}>
          <FormGroup row>
            <Col sm={12}>
              <h3 className="registration-h3">Create Account</h3>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <h6 className="registration-h6">
                It's free and hardly takes a minute.
              </h6>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12} className="col-icon">
              <Input
                type="text"
                name="name"
                id="Name"
                placeholder="Enter your fullname."
              />
              <i>
                <FontAwesomeIcon icon={faUserCircle} />
              </i>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12} className="col-icon">
              <Input
                type="text"
                name="username"
                id="Username"
                placeholder="Enter unique username."
              />
              <i>
                <FontAwesomeIcon icon={faUser} />
              </i>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12} className="col-icon">
              <Input
                type="email"
                name="email"
                id="Email"
                placeholder="Enter your Email."
              />
              <i>
                <FontAwesomeIcon icon={faEnvelope} />
              </i>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12} className="col-icon">
              <Input
                type="password"
                name="password"
                id="Password"
                placeholder="Enter your password."
              />
              <i>
                <FontAwesomeIcon icon={faLock} />
              </i>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12} className="col-icon">
              <Input
                type="password"
                name="confirmPassword"
                id="CPassword"
                placeholder="Please re-enter your password."
              />
              <i>
                <FontAwesomeIcon icon={faKey} />
              </i>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <Button
                className="registration-button"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <span>
                    Signing up... <Spinner size="sm" color="primary" />
                  </span>
                ) : (
                  <span>Sign up</span>
                )}
              </Button>
            </Col>
          </FormGroup>
          {validation.registrationFailed && (
            <FormGroup row>
              <Col sm={12} className="registration-failed">
                <i>
                  <FontAwesomeIcon icon={faExclamationTriangle} />
                  {validation.fieldValidation && (
                    <span> Please enter all the fields.</span>
                  )}
                  {validation.uniqueValidation && (
                    <span> Username or Email is already registered.</span>
                  )}
                  {validation.apiResponse && (
                    <span> Oops. Something went wrong.</span>
                  )}
                  {validation.passwordMatch && <span> Password mismatch.</span>}
                </i>
              </Col>
            </FormGroup>
          )}
          <FormGroup row>
            <Col sm={12}>
              <h6 className="registration-h6">
                By clicking the sign up button, you agree to our{" "}
                <b>Terms & Conditions</b>, and <b>Privacy Policy</b>.
              </h6>
            </Col>
          </FormGroup>
        </Form>
      </div>
    </div>
  );
};

export default RegistorForm;
