import React, { useEffect, useState } from "react";
import axios from "axios";
import "./quizPage.css";
import Paginate from "./paginate";
import {
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@material-ui/core";
import { Button as Btnrb, Row } from "react-bootstrap";
import { Form, FormGroup, Label, Col, Input } from "reactstrap";
import QuizTimer from "./quizTimer";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSpinner,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function QuizPage({ quizDetails, handleRollBack }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [questionPerPage] = useState(5);
  const [correctAnsweredQuestion, setcurrectAnsweredQuestion] = useState([]); //contanis id of correctly answered question
  const [allAnsweredQuestion, setAllAnsweredQuestion] = useState([]); //contanis id of all answered question
  const [instructionFlag, setInstructionFlag] = useState(false);
  const [quizEnd, setQuizEnd] = useState(false);
  const [player, setPlayer] = useState({
    lastName: "",
    firstName: "",
    age: 0,
    gender: "",
    email: "",
    cCIName: "",
    check: "0",
  });
  const [reported, setReported] = useState(false);

  useEffect(() => {
    let unMount = true;
    const bodyParams = {
      noOfQuestion: quizDetails.noOfQuestion,
      difficultyLevel: quizDetails.difficultyLevel,
      includedQueston: quizDetails.includedQueston,
      Uploadedby: quizDetails.quizOwner,
    };

    const header = {
      "Content-Type": "application/json",
    };

    // const url =
    //   "https://floating-badlands-28885.herokuapp.com/question/quizquestions";
    const url = "http://localhost:9000/question/quizquestions";
    setLoading(true);

    axios
      .post(url, bodyParams, header)
      .then((res) => {
        console.log(res.data);
        if (unMount) {
          setQuestions(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    console.log(window.location.href);

    return () => {
      unMount = false;
      console.log("unmounted quiz questions.");
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function createData(name, value) {
    return { name, value };
  }

  const rows = [
    createData("Total available question:", questions.length),
    createData("Total question attaimpted:", allAnsweredQuestion.length),
    createData(
      "Wrong answer given:",
      allAnsweredQuestion.length - correctAnsweredQuestion.length
    ),
    createData("Correct answer given:", correctAnsweredQuestion.length),
  ];

  const indexOfLastQuestion = currentPage * questionPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionPerPage;
  const currentQuestions = questions.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const hours = Math.floor(quizDetails.quizDuration / 60);
  const mins = Math.floor(quizDetails.quizDuration % 60);

  const paginateHandler = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(questions.length / questionPerPage)
    ) {
      setcurrentPage(pageNumber);
    }
  };

  //on Individial question submit
  const onAnswerSubmit = (realAnswer, questionId, e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const givenAnswer = data.get("givenAnswer");
    const temp = [...correctAnsweredQuestion];
    const temp1 = [...allAnsweredQuestion];
    if (temp1.indexOf(questionId) === -1) {
      temp1.push(questionId);
    }
    setAllAnsweredQuestion(temp1);
    if (givenAnswer === realAnswer && temp.indexOf(questionId) === -1) {
      temp.push(questionId);
      setcurrectAnsweredQuestion(temp);
    } else if (givenAnswer !== realAnswer && temp.indexOf(questionId) >= 0) {
      temp.pop(questionId);
      setcurrectAnsweredQuestion(temp);
    }
  };

  const handlePlayEvent = () => {
    if (quizDetails.testType === "private" && player.check !== "1") {
      alert("Please save the Personal information first.");
    } else {
      setInstructionFlag(true);
    }
  };

  const handleTestSubmit = () => {
    setQuizEnd(true);
  };

  const handleRollBackClick = () => {
    if (
      //   window.location.href === "https://serene-dubinsky-0f4e70.netlify.app/"
      window.location.href === "http://localhost:3000/"
    ) {
      handleRollBack();
    } else {
      const quizPlayer = {
        quizId: quizDetails._id,
        totalQuestion: questions.length,
        attaimpted: allAnsweredQuestion.length,
        correctAns: correctAnsweredQuestion.length,
        playerDetail: player,
      };

      console.log(JSON.stringify(quizPlayer));
      const url = "https://floating-badlands-28885.herokuapp.com/player";
      const headers = {
        "Content-Type": "apllication/json",
      };
      axios
        .post(url, quizPlayer, headers)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setReported(false);
  };

  const handleReportClick = (questionId) => {
    const report = {
      questionId: questionId,
    };
    const headers = {
      "Content-Type": "apllication/json",
    };

    const url = "http://localhost:9000/Question";

    axios
      .patch(url, report, headers)
      .then((res) => {
        if (res.data === 1) {
          setReported(true);
        } else {
          alert("Oops something went wrong.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const HandleDetailSumbit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    if (data.get("check") === "1") {
      setPlayer({
        lastName: data.get("lastName"),
        firstName: data.get("firstName"),
        age: data.get("age"),
        gender: data.get("gender"),
        email: data.get("email"),
        cCIName: data.get("cCIName"),
        phoneNumber: data.get("phoneNumber"),
        check: data.get("check"),
      });
    } else {
      alert("please check in the consent");
    }
  };

  return (
    <div>
      {quizEnd ? (
        <div className="wrapper-instruction">
          <div className="result-box">
            <h6 className="result-header">Here is your performance card.</h6>
            <TableContainer component={Paper}>
              <Table size="medium" aria-label="a dense table">
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Btnrb className="button-tmb" onClick={handleRollBackClick}>
                Ok
              </Btnrb>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          {instructionFlag ? (
            <div className="wrapper-qp">
              <Snackbar
                open={reported}
                autoHideDuration={3000}
                onClose={handleClose}
              >
                <Alert onClose={handleClose} severity="info">
                  Question reported successfully.!
                </Alert>
              </Snackbar>
              {!loading && (
                <div>
                  <QuizTimer
                    handleTestSubmit={handleTestSubmit}
                    mins={mins}
                    hours={hours}
                  />
                </div>
              )}
              <Row style={{ width: "100%" }}>
                <Col lg={3} md={12} sm={12} className="content-wrapper-qp">
                  <Row>
                    <h5 className="quizpage-h5">
                      <b>Answer tracker</b>
                    </h5>
                  </Row>
                  <Row>
                    {questions.map((question, index) => (
                      <Col lg={4} md={2} sm={3} xs={4} key={index}>
                        <button
                          className={
                            allAnsweredQuestion.indexOf(question._id) === -1
                              ? "button-question"
                              : "button-question-answered"
                          }
                        >
                          <span>
                            <b>Q.{index + 1}</b>
                          </span>
                        </button>
                      </Col>
                    ))}
                  </Row>
                </Col>
                <Col lg={9} md={12} sm={12}>
                  {loading ? (
                    <div className="spinner-quizPage">
                      <FontAwesomeIcon
                        size="4x"
                        color="green"
                        icon={faSpinner}
                        pulse
                      />
                    </div>
                  ) : (
                    <div className="question-area">
                      <h5 className="quizpage-h5">
                        <b>{quizDetails.title}</b>
                      </h5>
                      <ul className="list-group mb-4">
                        {currentQuestions.map((question, index) => (
                          <Row key={index}>
                            <form
                              onSubmit={(e) =>
                                onAnswerSubmit(question.answer, question._id, e)
                              }
                              className="Question-form"
                            >
                              <Col
                                lg={12}
                                md={12}
                                sm={12}
                                className="question-col"
                              >
                                <FormLabel component="legend">
                                  <h5>
                                    <b>
                                      Q.
                                      {currentPage * questionPerPage +
                                        index -
                                        questionPerPage +
                                        1}
                                    </b>{" "}
                                    {question.question}
                                  </h5>
                                </FormLabel>
                              </Col>
                              <RadioGroup
                                row
                                aria-label="givenAnswer"
                                name="givenAnswer"
                              >
                                <Col lg={6} md={12} sm={12}>
                                  <FormControlLabel
                                    value={question.option1}
                                    control={<Radio />}
                                    label={question.option1}
                                  />
                                </Col>
                                <Col lg={6} md={12} sm={12}>
                                  <FormControlLabel
                                    value={question.option2}
                                    control={<Radio />}
                                    label={question.option2}
                                  />
                                </Col>
                              </RadioGroup>
                              <RadioGroup
                                row
                                aria-label="givenAnswer"
                                name="givenAnswer"
                              >
                                <Col lg={6} md={12} sm={12}>
                                  <FormControlLabel
                                    value={question.option3}
                                    control={<Radio />}
                                    label={question.option3}
                                  />
                                </Col>
                                <Col lg={6} md={12} sm={12}>
                                  <FormControlLabel
                                    value={question.option4}
                                    control={<Radio />}
                                    label={question.option4}
                                  />
                                </Col>
                              </RadioGroup>
                              <Col
                                lg={12}
                                md={12}
                                sm={12}
                                className="sumbit-button-col"
                              >
                                <p
                                  onClick={() =>
                                    handleReportClick(question._id)
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faExclamationTriangle}
                                  />
                                  &nbsp;
                                  <Link to="/" style={{ color: "red" }}>
                                    Report
                                  </Link>
                                </p>
                                <Btnrb
                                  type="submit"
                                  variant="success"
                                  className="sumbit-button-inv"
                                >
                                  Sumbit Answer
                                </Btnrb>
                              </Col>
                            </form>
                          </Row>
                        ))}
                      </ul>
                      <Btnrb className="button-st" onClick={handleTestSubmit}>
                        Sumbit Test
                      </Btnrb>
                      <Row className="justify-content-md-center">
                        <Paginate
                          questionPerPage={questionPerPage}
                          totalQuestion={questions.length}
                          paginateHandler={paginateHandler}
                          currentPage={currentPage}
                        />
                      </Row>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          ) : (
            <div className="wrapper-instruction">
              <div className="instruction-box">
                {quizDetails.testType === "private" ? (
                  <div className="personalInfo">
                    <h3 className="h3-pi">Personal Information.</h3>
                    <Form className="form-pi" onSubmit={HandleDetailSumbit}>
                      <FormGroup row>
                        <Label for="LastName" sm={2}>
                          Last Name:
                        </Label>
                        <Col sm={4}>
                          <Input
                            type="text"
                            name="lastName"
                            id="LastName"
                            placeholder="Enter last name."
                          />
                        </Col>
                        <Label for="FirstName" sm={2}>
                          First Name:
                        </Label>
                        <Col sm={4}>
                          <Input
                            type="text"
                            name="firstName"
                            id="FirstName"
                            placeholder="Enter first name."
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="Age" sm={2}>
                          Age:
                        </Label>
                        <Col sm={4}>
                          <Input
                            type="text"
                            name="age"
                            id="Age"
                            placeholder="Enter your age."
                          />
                        </Col>
                        <Label for="Gender" sm={2}>
                          Gender:
                        </Label>
                        <Col sm={4}>
                          <Input type="select" name="gender" id="Gender">
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="email" sm={2}>
                          Email:
                        </Label>
                        <Col sm={4}>
                          <Input
                            type="email"
                            name="email"
                            id="Email"
                            placeholder="Enter your email address."
                          />
                        </Col>
                        <Label for="PhoneNumber" sm={2}>
                          Phone Number
                        </Label>
                        <Col sm={4}>
                          <Input
                            type="text"
                            name="phoneNumber"
                            id="PhoneNumber"
                            placeholder="Enter your Phone Number."
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="CCIName" sm={2}>
                          College / Company / institution Name:
                        </Label>
                        <Col sm={10}>
                          <Input
                            type="text"
                            name="cCIName"
                            id="CCIName"
                            placeholder="Enter College/Company/Institute name."
                          />
                        </Col>
                      </FormGroup>
                      <FormControlLabel
                        value="1"
                        name="check"
                        id="exampleCheck"
                        control={<Checkbox color="primary" />}
                        label="I agree, above data is correct and valid as per my knowledge."
                        labelPlacement="end"
                      />
                      <Btnrb
                        type="submit"
                        variant="success"
                        className="button-details"
                      >
                        Save
                      </Btnrb>
                    </Form>
                  </div>
                ) : (
                  <div></div>
                )}
                <h3 className="h3-pi">Quiz Instrusctions.</h3>
                <div>
                  <h6>
                    <p>
                      <b>
                        Ensure you read this guide and instruction from start to
                        end.
                      </b>
                    </p>
                  </h6>
                  <p>
                    <b>1.</b> Each quiz has a limited time. You must finish and
                    sumbit the quiz with in given time limit.
                  </p>
                  <p>
                    <b>2.</b> The quiz will be automatically submitted as soon
                    as your time elapses.
                  </p>
                  <p>
                    <b>3.</b> After selecting your answer you must submit each
                    question's answer Individially.
                  </p>
                  <p>
                    <b>4.</b> Unsumbitted question's answer will not be
                    considered while calculating quiz final score.
                  </p>
                  <p>
                    <b>5.</b> You can change your answer multiple time.The final
                    selected answer will be considered while calculating quiz
                    final score.
                  </p>
                  <p>
                    <b>6.</b> Answer can be changed even after submitting the
                    answer
                  </p>
                  <p>
                    <b>7.</b> Each question contains 4 options and anyone of
                    them would be corect answer
                  </p>
                  <p>
                    <b>8.</b> Question numbers in red and green color can be
                    seen at left side of the screen. These represents unanswered
                    and answered question respectively.
                  </p>
                  <p>
                    <b>9.</b> Answer can be changed even after submitting the
                    answer.
                  </p>
                  <Row>
                    <Col lg={6} md={6} sm={12}>
                      <Link to="/" style={{ textDecoration: "none" }}>
                        <Btnrb
                          className="button-tmb"
                          onClick={handleRollBackClick}
                        >
                          Take me back
                        </Btnrb>
                      </Link>
                    </Col>
                    <Col lg={6} md={6} sm={12}>
                      <Btnrb className="button-pq" onClick={handlePlayEvent}>
                        Play quiz
                      </Btnrb>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
