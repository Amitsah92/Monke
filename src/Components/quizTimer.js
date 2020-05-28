import React, { useState, useEffect } from "react";
import "./quizPage.css";

const QuizTimer = ({ handleTestSubmit, mins, hours }) => {
  const [time, setTime] = useState({ ms: 0, s: 0, m: mins, h: hours });
  const [interv, setInterv] = useState();

  useEffect(() => {
    let unMount = false;
    if (!unMount) {
      start();
    }

    return () => {
      unMount = true;
      console.log("timer unmounted");
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const start = () => {
    run();
    setInterv(setInterval(run, 10));
  };

  if (time.h === 0 && time.m === 0 && time.s === 0 && time.ms === 0) {
    clearInterval(interv);
    handleTestSubmit();
  }

  var updateMs = time.ms,
    updateS = time.s,
    updateM = time.m,
    updateH = time.h;

  const run = () => {
    if (updateM === 0 && updateH !== 0) {
      updateH--;
      updateM = 60;
    }
    if (updateS === 0 && updateM !== 0) {
      updateM--;
      updateS = 60;
    }
    if (updateMs === 0 && updateS !== 0) {
      updateS--;
      updateMs = 100;
    }
    updateMs--;
    setTime({ ms: updateMs, s: updateS, m: updateM, h: updateH });
  };

  return (
    <div className="content-wrapper-timer">
      <span className="timer timer-radius-left">
        <b>Time left:-</b>
      </span>
      <span className="timer">
        <b>{time.h >= 10 ? time.h : "0" + time.h}</b>&nbsp;:&nbsp;
      </span>
      <span className="timer">
        <b>{time.m >= 10 ? time.m : "0" + time.m}</b>&nbsp;:&nbsp;
      </span>
      <span className="timer">
        <b>{time.s >= 10 ? time.s : "0" + time.s}</b>&nbsp;:&nbsp;
      </span>
      <span className="timer timer-radius-right">
        <b>{time.ms >= 10 ? time.ms : "0" + time.ms}</b>
      </span>
    </div>
  );
};

export default QuizTimer;
