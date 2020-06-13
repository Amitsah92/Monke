import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Card } from "react-bootstrap";
import { UserContext } from "../context";
import "./addQuestion.css";
import Chip from "@material-ui/core/Chip";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function AddQuestion() {
  const [yourQuestion, setYourQuestion] = useState([]);
  const [success, setSuccess] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(false);
  const [busyBtn, setBusyBtn] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [questionPerPage] = useState(10);
  const [updated, setUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  var CatogoryData = ["Reactjs", "Math", "General Knowlwdge", "C Sharp", "IQ"];

  useEffect(() => {
    const bodyParams = {
      Uploadedby: user.userId,
    };

    const header = {
      "Content-Type": "application/json",
    };

    setLoading(true);

    axios
      .post(
        "https://floating-badlands-28885.herokuapp.com/question/Questions",
        bodyParams,
        header
      )
      .then((res) => {
        console.log(res.data);
        setYourQuestion(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });

    return () => {
      console.log("unmounted add questions page");
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
    setDeleted(false);
  };

  const indexOfLastQuestion = currentPage * questionPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionPerPage;
  const currentQuestions = yourQuestion.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const handlePageChange = (event, page) => {
    setcurrentPage(page);
  };

  const handleQuestionDetele = (e, questionId, question) => {
    e.preventDefault();

    const url =
      "https://floating-badlands-28885.herokuapp.com/Question/" + questionId;

    if (window.confirm("Are you sure to delete?")) {
      axios
        .delete(url)
        .then((res) => {
          console.log(res.data);
          if (res.data === 1) {
            setUpdated(!updated);
            setDeleted(true);
          } else {
            setError(true);
          }
        })
        .catch((err) => {
          console.log(" Error message:" + err);
          setError(true);
        });
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setBusyBtn(true);
    const data = new FormData(e.target);

    var Answer = data.get("answerSelect");
    if (Answer === "Option1") Answer = data.get("option1");
    else if (Answer === "Option2") Answer = data.get("option2");
    else if (Answer === "Option3") Answer = data.get("option3");
    else Answer = data.get("option4");

    const question = {
      question: data.get("question"),
      option1: data.get("option1"),
      option2: data.get("option2"),
      option3: data.get("option3"),
      option4: data.get("option4"),
      category: data.get("category"),
      answer: Answer,
      difficulty: data.get("dificultyLevel"),
      Uploadedby: user.userId,
    };
    console.log(JSON.stringify(question));
    const url = "http://localhost:9000/question";
    //const url = "https://floating-badlands-28885.herokuapp.com/question";

    const headers = {
      "Content-Type": "apllication/json",
    };

    axios
      .post(url, question, headers)
      .then((res) => {
        if (res.data === "1") {
          console.log(res.data);
          setSuccess(true);
          setUpdated(!updated);
        } else {
          setError(true);
        }
        setBusyBtn(false);
      })
      .catch((err) => {
        console.log(" Error message:" + err);
        setBusyBtn(false);
        setError(true);
      });
  };

  if (!user.isLoggedIn) {
    return <Redirect to="/Login" />;
  }

  return (
    <div className="background-wrapper">
      <div className="filterArea">
        <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Question uploaded successfully.!
          </Alert>
        </Snackbar>
        <Snackbar open={deleted} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Question deleted successfully.!
          </Alert>
        </Snackbar>
        <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            oops something went wrong.!
          </Alert>
        </Snackbar>
        <Form onSubmit={onFormSubmit}>
          <FormGroup row>
            <Label for="Question" lg={1} md={12} sm={12}>
              <b>Question</b>
            </Label>
            <Col lg={11} md={12} sm={12}>
              <Input
                type="text"
                name="question"
                id="Question"
                placeholder="Enter question"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Option1" lg={1} md={12} sm={12}>
              <b>Option1</b>
            </Label>
            <Col lg={5} md={12} sm={12}>
              <Input
                type="text"
                name="option1"
                id="Option1"
                placeholder="Enter first option"
              />
            </Col>
            <Label for="Option2" lg={1} md={12} sm={12}>
              <b>Option2</b>
            </Label>
            <Col lg={5} md={12} sm={12}>
              <Input
                type="text"
                name="option2"
                id="Option2"
                placeholder="Enter second option"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Option3" lg={1} md={12} sm={12}>
              <b>Option3</b>
            </Label>
            <Col lg={5} md={12} sm={12}>
              <Input
                type="text"
                name="option3"
                id="Option3"
                placeholder="Enter third option"
              />
            </Col>
            <Label for="Option4" lg={1} md={12} sm={12}>
              <b>Option4</b>
            </Label>
            <Col lg={5} md={12} sm={12}>
              <Input
                type="text"
                name="option4"
                id="Option4"
                placeholder="Enter fourth option"
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="AnswerSelect" lg={1} md={12} sm={12}>
              <b>Answer</b>
            </Label>
            <Col lg={5} md={12} sm={12}>
              <Input type="select" name="answerSelect" id="AnswerSelect">
                <option>Option1</option>
                <option>Option2</option>
                <option>Option3</option>
                <option>Option4</option>
              </Input>
            </Col>
            <Label for="Dificulty" lg={1} md={12} sm={12}>
              <b>Dificulty Level</b>
            </Label>
            <Col lg={5} md={12} sm={12}>
              <Input type="select" name="dificultyLevel" id="DificultyLevel">
                <option>Easy</option>
                <option>Moderate</option>
                <option>Hard</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="Category" lg={1} md={12} sm={12}>
              <b>Category</b>
            </Label>
            <Col lg={5} md={12} sm={12}>
              <Input type="select" name="category" id="Category">
                {CatogoryData.map((category, index) => (
                  <option key={index}>{category}</option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <Button type="submit" size="lg" block disabled={busyBtn}>
                Submit
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
      <div>
        {loading ? (
          <div className="spinner-addQuestion">
            <FontAwesomeIcon size="4x" color="green" icon={faSpinner} pulse />
          </div>
        ) : (
          <div className="question-render">
            <h3>Your Contribution to Question Bank.</h3>
            <Row>
              {currentQuestions.map((eachQuestion, index) => (
                <Col lg={6} md={12} sm={12} key={index}>
                  <Card
                    key={index}
                    style={{ width: "100%", marginBottom: "30px" }}
                  >
                    <Card.Header>
                      <h6 className="quiz-title">
                        <b>
                          Q{(currentPage - 1) * questionPerPage + index + 1}.
                        </b>{" "}
                        {eachQuestion.question}
                      </h6>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col lg={6} md={12} sm={12}>
                          <Chip
                            style={{ width: "100%", marginBottom: "10px" }}
                            label={eachQuestion.option1}
                          />
                          <Chip
                            style={{ width: "100%", marginBottom: "10px" }}
                            label={eachQuestion.option2}
                          />
                        </Col>
                        <Col lg={6} md={12} sm={12}>
                          <Chip
                            style={{ width: "100%", marginBottom: "10px" }}
                            label={eachQuestion.option3}
                          />
                          <Chip
                            style={{ width: "100%", marginBottom: "10px" }}
                            label={eachQuestion.option4}
                          />
                        </Col>
                        <Col sm={12} className="delete-icon">
                          <i>
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={(e) =>
                                handleQuestionDetele(
                                  e,
                                  eachQuestion._id,
                                  eachQuestion
                                )
                              }
                            />
                          </i>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <Row className="justify-content-md-center">
              <Pagination
                count={Math.ceil(yourQuestion.length / questionPerPage)}
                showFirstButton
                showLastButton
                onChange={handlePageChange}
              />
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}
