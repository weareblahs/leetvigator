import "bootstrap/dist/css/bootstrap.css";
import { Badge, Button, Container, Form, FormControl } from "react-bootstrap";
import { useState } from "react";
import { Questions } from "./questions";

function App() {
  const [question, setQuestion] = useState(0);
  const [rurl, setRedirectionURL] = useState("#");
  const [qd, setQuestionDisplay] = useState({ title: "No question." });

  const setQuestionNumber = (q) => {
    if (q == 0) {
      setQuestionDisplay({ title: "No question." });
      setRedirectionURL("#");
    } else if (q > Questions.questions.length) {
      setQuestionDisplay({ title: "Question number invalid." });
      setRedirectionURL("#");
    } else {
      setQuestionDisplay(
        Questions.questions.filter(
          (question) => question.frontendQuestionId == q
        )[0]
      );
      setRedirectionURL(
        `https://leetcode.com/problems/${
          Questions.questions.filter(
            (question) => question.frontendQuestionId == q
          )[0].titleSlug
        }`
      );
    }
  };
  const randomQuestion = () => {
    const randomQuestionNumber = parseInt(
      Math.random() * (Questions.questions.length - 1) + 1
    );
    window.location.href = `https://leetcode.com/problems/${
      Questions.questions.filter(
        (question) => question.frontendQuestionId == randomQuestionNumber
      )[0].titleSlug
    }`;
  };
  return (
    <>
      <Container
        className="d-flex"
        style={{
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="d-block">
          <h1 className="text-center" style={{ fontSize: "5em" }}>
            Leetvigator
          </h1>
          <h5 className="text-center">
            <i>
              For those who wanted to navigate through LeetCode, but only know
              the question number
            </i>
          </h5>

          <FormControl
            className="text-center"
            type="number"
            style={{ fontSize: "6em" }}
            placeholder="Which question?"
            onChange={(e) => {
              setQuestionNumber(e.target.value);
            }}
            min="0"
            max={Questions.questions.length}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.location.href = rurl;
              }
            }}
          ></FormControl>
          <div className="ms-auto me-auto">
            <h2 className="text-center mt-2 mb-2">{qd.title} </h2>
            <center>
              <Badge
                className="text-center mt-1 mb-2"
                style={{ fontSize: "1em" }}
              >
                {qd.difficulty ? qd.difficulty : "None"}
              </Badge>
              <Badge
                className="text-center mt-1 mb-2 ms-4"
                bg="warning"
                style={{ fontSize: "1em", color: "#000" }}
              >
                {qd.paidOnly ? "Premium" : ""}
              </Badge>
            </center>
          </div>
          <p className="text-center">
            Press ENTER to navigate to the selected question, or{" "}
            <a
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => (window.location.href = rurl)}
            >
              click here
            </a>
          </p>
          <div className="text-center">
            <Button
              className="btn btn-lg btn-primary"
              onClick={() => randomQuestion()}
            >
              🎉 Surprise me!
            </Button>
          </div>
        </div>
      </Container>
      <div className="fixed-bottom text-center mb-4">
        <i className="">
          Currently has {Questions.questions.length} questions. Updated as of
          {` ${Questions.updatedDate}`}.
          <br />
          Question data taken from LeetCode's GraphQL API following{" "}
          <a href="https://github.com/akarsh1995/leetcode-graphql-queries">
            this repository's guide.
          </a>{" "}
          <br />
          Questions are only accessible according to your current LeetCode plan.
          Made by <a href="https://github.com/weareblahs">Tan (weareblahs)</a>.
        </i>
      </div>
    </>
  );
}

export default App;
