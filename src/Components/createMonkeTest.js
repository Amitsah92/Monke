import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context";
import "./createMonkeTest.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Login from "../Containers/Login/Login";
import { Row, Col, Image, Card } from "react-bootstrap";
import { Button, FormGroup, Input, Label, Form } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSpinner } from "@fortawesome/free-solid-svg-icons";
import cardImg from "../Containers/Header/quizHome.png";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";

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
  const [disAbleBtn, setDisAbleBtn] = useState(false);
  const { user } = useContext(UserContext);
  const [deleted, setDeleted] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [quizPerPage] = useState(12);

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
  }, [disAbleBtn]);

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
      quizDuration: data.get("quizDuration"),
      quizOwner: user.userId,
    };
    console.log(JSON.stringify(quiz));
    const url = "https://floating-badlands-28885.herokuapp.com/quiz";
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
            type: res.data.testType,
            success: true,
          });
          setDisAbleBtn(!disAbleBtn);
          setQuizUploaded(true);
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
            setDisAbleBtn(!disAbleBtn); //works for both delete or upload. used to refresh data
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
    setDeleted(false);
    setQuizUploaded(true);
  };

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
        <div>
          {user.isLoggedIn ? (
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
                      <Input
                        type="select"
                        name="noOfQuestion"
                        id="NoOfQuestion"
                      >
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
                    <Label for="yourSelectedDate" lg={2} md={12} sm={12}>
                      Test Expiry Date:
                    </Label>
                    <Col lg={4} md={12} sm={12} className="difficulty">
                      <DatePicker
                        className="cos-datepicker"
                        name="yourSelectedDate"
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="yyyy/MM/dd"
                        minDate={new Date()}
                        isClearable
                        showYearDropdown
                        scrollableYearDropdown
                        autoComplete="off"
                      />
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
                        <Col lg={3} md={4} sm={6} xm={12} key={index}>
                          <Card
                            key={index}
                            style={{ width: "100%", marginBottom: "30px" }}
                          >
                            <Card.Img variant="top" src={cardImg} />
                            <Card.Header>
                              <b>{quiz.title}</b>
                            </Card.Header>
                            <Card.Body>
                              <Card.Text>
                                Difficulty Level: <b>{quiz.difficultyLevel}</b>
                              </Card.Text>
                              <Card.Text>
                                Quiz Duration: <b>{quiz.quizDuration}</b>
                              </Card.Text>
                              <Card.Text>
                                Total number of Questions:{" "}
                                <b>{quiz.noOfQuestion}</b>
                              </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                              <Row>
                                <Col lg={10} md={10} sm={10} xm={10}>
                                  <small className="text-muted">
                                    Expires in {expiresInDate(quiz.expiryDate)}{" "}
                                    Days.
                                  </small>
                                </Col>
                                <Col lg={1} md={1} sm={1} xm={1}>
                                  <FontAwesomeIcon
                                    className="trash-icon"
                                    icon={faTrash}
                                    onClick={(e) =>
                                      handleQuizDetele(e, quiz._id)
                                    }
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
          ) : (
            <Login />
          )}
        </div>
      )}
    </div>
  );
}
