import "bootstrap/dist/css/bootstrap.css";
import { Container, Form, FormControl } from "react-bootstrap";
import { useState } from "react";
import { Questions } from "./questions";

function App() {
  const [question, setQuestion] = useState(0);
  const [rurl, setRedirectionURL] = useState("#");
  const [qd, setQuestionDisplay] = useState("No question.");
  const setQuestionNumber = (q) => {
    if (q == 0) {
      setQuestionDisplay("No question.");
      setRedirectionURL("#");
    } else if (q > Questions.questions.length) {
      setQuestionDisplay("Question number invalid.");
      setRedirectionURL("#");
    } else {
      setQuestionDisplay(
        Questions.questions.filter(
          (question) => question.frontendQuestionId == q
        )[0].title
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
            className=" text-center"
            type="number"
            style={{ fontSize: "6em" }}
            placeholder="Which question?"
            onChange={(e) => {
              setQuestionNumber(e.target.value);
            }}
            min="0"
            max={Questions.questions.length}
            defaultValue={question}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.location.href = rurl;
              }
            }}
          ></FormControl>
          <h2 className="text-center mt-2 mb-2">{qd}</h2>
          <p className="text-center">
            Press ENTER to navigate to the selected question
          </p>
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