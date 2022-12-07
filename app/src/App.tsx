import { useState } from "react";
import { Button, Dropdown, Form, Input } from "semantic-ui-react";
import Accordion from "./Accordion";
import "./App.css";

//

function App() {
  const [active, setActive] = useState(false);
  const [pythonFetchTime, setPythonFetchTime] = useState(0);
  const [jsFetchTime, setJSFetchTime] = useState(0);

  const [languageSequence, setLanguageSequence] = useState("");
  const [queryType, setQueryType] = useState("");
  const [iterations, setIterations] = useState(0);

  const getAllShippersGo = (iterations: number) => {
    for (let i = 0; i < iterations; i++) {
      let start = performance.now();
      fetch("http://127.0.0.1:8083/go/all-shippers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          if (response.ok) return response.json();
        })
        .then((data) => {
          let end = performance.now();
          // setJSFetchTime(end - start);
          console.log("end of go fetch: ", end - start);
          console.log(data);
        });
    }
  };

  const getAllShippersJS = (iterations: number) => {
    let start = performance.now();
    fetch("http://127.0.0.1:3001/northwind/javascript/all-shippers", {
      method: "GET",
    })
      .then((response) => {
        console.log(response);
        if (response.ok) return response.json();
      })
      .then((data) => {
        let end = performance.now();
        setJSFetchTime(end - start);
        console.log("end of js fetch: ", end - start);
        console.log(data);
      });
  };

  const getAllShippersPython = (iterations: number) => {
    let start = performance.now();
    fetch("http://127.0.0.1:3001/northwind/javascript/all-shippers", {
      method: "GET",
    })
      .then((response) => {
        console.log(response);
        if (response.ok) return response.json();
      })
      .then((data) => {
        let end = performance.now();
        setJSFetchTime(end - start);
        console.log("end of js fetch: ", end - start);
        console.log(data);
      });
  };

  const options = [
    {
      key: "GET",
      text: "GET",
      value: "GET",
    },
    {
      key: "JOIN",
      text: "JOIN",
      value: "JOIN",
    },
  ];

  const languages = [
    {
      key: "JavaScript",
      text: "JavaScript",
      value: "JavaScript",
    },
    {
      key: "Go",
      text: "Go",
      value: "Go",
    },
    {
      key: "Python",
      text: "Python",
      value: "Python",
    },
    {
      key: "JavaScript, Go, Python",
      text: "JavaScript, Go, Python",
      value: "JavaScript, Go, Python",
    },
  ];

  // {/* <button onClick={() => setActive(true)}>Run Tests</button> */}
  // {/* <p>{pythonFetchTime}</p> */}
  return (
    <div className="App">
      <header className="App-header">
        <h1>Test API Response Times</h1>
      </header>
      <div className="form-wrapper">
        <Form className="form">
          <Form.Group widths="equal">
            <Form.Field>
              <label className="label">Select Language</label>
              <Dropdown
                placeholder="Select Language"
                fluid
                selection
                options={languages}
                onChange={(e, data) => {
                  setLanguageSequence(data.value as string);
                }}
              />{" "}
            </Form.Field>
            <Form.Field>
              <label className="label">Query Type</label>
              <Dropdown
                placeholder="Select Type"
                fluid
                selection
                options={options}
                onChange={(e, data) => {
                  setQueryType(data.value as string);
                }}
              />
            </Form.Field>
            <Form.Field>
              <label className="label"># of Repetitions</label>
              <Input
                fluid
                placeholder={0}
                type="number"
                id="reps1"
                onChange={(e, data) => {
                  setIterations(parseInt(data.value));
                }}
              />
            </Form.Field>
          </Form.Group>
        </Form>
        <Button positive>Run Queries</Button>
      </div>
      <div className="accordion">
        <Accordion />
      </div>
    </div>
  );
}

export default App;
