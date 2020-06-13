import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context";
import "./createMonkeTest.css";
import { Redirect } from "react-router-dom";
import DatePicker from "reactstrap-date-picker";
import "react-datepicker/dist/react-datepicker.css";
import { Row, Col, Image, Card } from "react-bootstrap";
import { Button, FormGroup, Input, Label, Form } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faSpinner,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";
import Chip from "@material-ui/core/Chip";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CreateMonkTest() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [quizValue, setQuizValue] = useState({
    id: "",
    password: "",
    type: "",
    success: false,
  });
  const [busyBtn, setBusyBtn] = useState(false);
  const [yourQuizs, setYourQuizs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizUploaded, setQuizUploaded] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { user } = useContext(UserContext);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [quizPerPage] = useState(12);
  const [hide, setHide] = useState(true);

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
        "https://floating-badlands-28885.herokuapp.com/quiz/findquiz",
        bodyParams,
        header
      )
      .then((res) => {
        console.log(res.data);
        setYourQuizs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    return () => {
      console.log("unmounted add questions page");
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const indexOfLastQuiz = currentPage * quizPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizPerPage;
  const currentQuizs = yourQuizs.slice(indexOfFirstQuiz, indexOfLastQuiz);

  const handlePageChange = (event, page) => {
    setcurrentPage(page);
  };

  const expiresInDate = (expiryDate) => {
    var expDate = new Date(expiryDate);
    var currentDate = new Date();
    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((expDate - currentDate) / oneDay));
    return <b>{diffDays}</b>;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setBusyBtn(true);
    const data = new FormData(e.target);
    const quiz = {
      title: data.get("title"),
      noOfQuestion: data.get("noOfQuestion"),
      difficultyLevel: data.get("difficultyLevel"),
      testType: data.get("type"),
      includedQueston: data.get("includedQuestion"),
      expiryDate: data.get("yourSelectedDate"),
      category: data.get("category"),
      quizDuration: data.get("quizDuration"),
      quizOwner: user.userId,
    };
    console.log(JSON.stringify(quiz));
    const url = "https://floating-badlands-28885.herokuapp.com/quiz";
    //const url = "http://localhost:9000/quiz";
    const headers = {
      "Content-Type": "apllication/json",
    };
    axios
      .post(url, quiz, headers)
      .then((res) => {
        console.log(res.data);
        console.log(res.statusText);
        console.log(res.data.id);
        if (res.data.Id !== undefined) {
          setQuizValue({
            id: res.data.Id,
            password: res.data.password,
            type: data.get("type"),
            success: true,
          });
          setQuizUploaded(true);
          setRefresh(!refresh);
        } else {
          alert("Please eneter all required data.");
        }
        setBusyBtn(false);
      })
      .catch((err) => {
        console.log(" Error message:" + err);
        setBusyBtn(false);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setQuizValue({ id: "", password: "", success: false });
  };

  const handleQuizDetele = (e, quizId) => {
    e.preventDefault();
    const url = "https://floating-badlands-28885.herokuapp.com/quiz/" + quizId;

    if (window.confirm("Are you sure to delete?")) {
      axios
        .delete(url)
        .then((res) => {
          console.log(res.data);
          if (res.data === 1) {
            setDeleted(true);
            setRefresh(!refresh); //works for both delete or upload. used to refresh data
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
    setDeleted(false);
    setQuizUploaded(false);
  };

  const handleEyeIconClick = (e) => {
    setHide(!hide);
  };

  if (!user.isLoggedIn) {
    return <Redirect to="/Login" />;
  }

  return (
    <div>
      {quizValue.success && quizValue.type === "Private" ? (
        <div className="wrapper-sc">
          <div className="bg-form-wrapper">
            <form className="custom-form-sc" onSubmit={onFormSubmit}>
              <h4 className="QuizIdPaassword-h4">
                Quiz created successfully.
                <Image className="image-custom" src="Assets/greentick.png" />
              </h4>
              <div className="title">
                <label className="label-1">
                  Quiz Id:{" "}
                  <b>
                    <u>{quizValue.id}</u>
                  </b>
                </label>
                <label className="label-1">
                  Quiz Password:{" "}
                  <b>
                    <u>{quizValue.password}</u>
                  </b>
                </label>
              </div>
              <h6 className="QuizIdPaassword-h6">
                <b>Note: </b>Please save quiz <b>ID </b> and <b>Password</b> for
                future use.
              </h6>
              <div className="sumbitQuestion">
                <button onClick={handleClick}>Ok</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <div className="form-wrapper">
            <h1 className="custom-h1">Create Test</h1>
            <Form onSubmit={onFormSubmit}>
              <FormGroup row>
                <Label for="Title" lg={2} md={12} sm={12}>
                  Title:
                </Label>
                <Col lg={10} md={12} sm={12}>
                  <Input
                    type="text"
                    name="title"
                    id="Title"
                    placeholder="Descriptive title for the quiz."
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="NoOfQuestion" lg={2} md={12} sm={12}>
                  Number of Question:
                </Label>
                <Col lg={4} md={12} sm={12}>
                  <Input type="select" name="noOfQuestion" id="NoOfQuestion">
                    <option>25</option>
                    <option>40</option>
                    <option>50</option>
                    <option>60</option>
                    <option>75</option>
                    <option>100</option>
                  </Input>
                </Col>
                <Label for="DifficultyLevel" lg={2} md={12} sm={12}>
                  Dificulty Level:
                </Label>
                <Col lg={4} md={12} sm={12}>
                  <Input
                    type="select"
                    name="difficultyLevel"
                    id="DifficultyLevel"
                  >
                    <option>Easy</option>
                    <option>Moderate</option>
                    <option>Hard</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="Type" lg={2} md={12} sm={12}>
                  Test type:
                </Label>
                <Col lg={4} md={12} sm={12}>
                  <Input type="select" name="type" id="Type">
                    <option>Private</option>
                    <option>Public</option>
                  </Input>
                </Col>
                <Label for="IncludedQuestion" lg={2} md={12} sm={12}>
                  Include Question:
                </Label>
                <Col lg={4} md={12} sm={12}>
                  <Input
                    type="select"
                    name="includedQuestion"
                    id="IncludedQuestion"
                  >
                    <option>ALL</option>
                    <option>Only uploaded by me</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="QuizDuration" lg={2} md={12} sm={12}>
                  Quiz duration:
                </Label>
                <Col lg={4} md={12} sm={12}>
                  <Input
                    type="text"
                    name="quizDuration"
                    id="QuizDuration"
                    placeholder="Enter quiz duration in Minutes (> 5 mins and < 180 mins)"
                  />
                </Col>
                <Label for="YourSelectedDate" lg={2} md={12} sm={12}>
                  Test Expiry Date:
                </Label>
                <Col lg={4} md={12} sm={12} className="difficulty">
                  <DatePicker
                    className="cos-datepicker"
                    id="YourSelectedDate"
                    name="yourSelectedDate"
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="YYYY/MM/DD"
                    minDate={new Date().toString()}
                    autoComplete="off"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="Category" lg={2} md={12} sm={12}>
                  Category:
                </Label>
                <Col lg={4} md={12} sm={12}>
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
          <div className="quiz-area">
            {loading ? (
              <div className="spinner-createTest">
                <FontAwesomeIcon
                  size="4x"
                  color="green"
                  icon={faSpinner}
                  pulse
                />
              </div>
            ) : (
              <div>
                <Snackbar
                  open={deleted}
                  autoHideDuration={3000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="success">
                    Quiz deleted successfully.!
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={quizUploaded}
                  autoHideDuration={3000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="success">
                    Quiz uploaded successfully.!
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={error}
                  autoHideDuration={3000}
                  onClose={handleClose}
                >
                  <Alert onClose={handleClose} severity="error">
                    oops something went wrong.!
                  </Alert>
                </Snackbar>
                <Row>
                  {currentQuizs.map((quiz, index) => (
                    <Col lg={4} md={6} sm={12} xm={12} key={index}>
                      <Card key={index} className="card-style">
                        <Card.Header style={{ backgroundColor: "green" }}>
                          <b>{quiz.title}</b>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <Row>
                              <Col lg={6} md={6} sm={6} xm={6}>
                                <Chip
                                  style={{
                                    width: "100%",
                                    marginBottom: "10px",
                                  }}
                                  label={quiz.category}
                                />
                              </Col>
                              <Col lg={6} md={6} sm={6} xm={6}>
                                <Chip
                                  style={{
                                    width: "100%",
                                    marginBottom: "10px",
                                  }}
                                  label={quiz.testType}
                                />
                              </Col>
                              <Col lg={6} md={6} sm={6} xm={6}>
                                <Chip
                                  style={{
                                    width: "100%",
                                    marginBottom: "10px",
                                  }}
                                  label={quiz.difficultyLevel}
                                />
                              </Col>
                              <Col lg={6} md={6} sm={6} xm={6}>
                                <Chip
                                  style={{
                                    width: "100%",
                                    marginBottom: "10px",
                                  }}
                                  label={quiz.quizDuration + " mins"}
                                />
                              </Col>
                              <Col lg={6} md={6} sm={6} xm={6}>
                                <Chip
                                  style={{
                                    width: "100%",
                                    marginBottom: "10px",
                                  }}
                                  label={quiz.noOfQuestion + " Questions"}
                                />
                              </Col>
                              <Col lg={6} md={6} sm={6} xm={6}>
                                <Chip
                                  style={{
                                    width: "100%",
                                    marginBottom: "10px",
                                  }}
                                  label={"QuizId: " + quiz.quizId}
                                />
                              </Col>
                              <Label
                                className="quiz-password-label"
                                for="Password"
                                lg={6}
                                md={6}
                                sm={6}
                              >
                                Quiz Password:
                              </Label>
                              <Col
                                lg={6}
                                md={6}
                                sm={6}
                                className="quiz-password-col"
                              >
                                <input
                                  className="quiz-password-input"
                                  type={hide ? "password" : "text"}
                                  value={quiz.quizPassword}
                                  name="password"
                                  id="Password"
                                  disabled
                                />
                                {hide ? (
                                  <i>
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      onClick={handleEyeIconClick}
                                    />
                                  </i>
                                ) : (
                                  <i>
                                    <FontAwesomeIcon
                                      icon={faEyeSlash}
                                      onClick={handleEyeIconClick}
                                    />
                                  </i>
                                )}
                              </Col>
                            </Row>
                          </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                          <Row>
                            <Col lg={10} md={10} sm={10} xs={10}>
                              <small className="text-muted">
                                Expires in {expiresInDate(quiz.expiryDate)}{" "}
                                Days.
                              </small>
                            </Col>
                            <Col lg={1} md={1} sm={1} xs={1}>
                              <FontAwesomeIcon
                                className="trash-icon"
                                icon={faTrash}
                                onClick={(e) => handleQuizDetele(e, quiz._id)}
                              />
                            </Col>
                          </Row>
                        </Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Row className="justify-content-md-center">
                  <Pagination
                    count={Math.ceil(yourQuizs.length / quizPerPage)}
                    showFirstButton
                    showLastButton
                    onChange={handlePageChange}
                  />
                </Row>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
