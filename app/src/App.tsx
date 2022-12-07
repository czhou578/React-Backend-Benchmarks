import { useEffect, useState } from "react";
import { Button, Dropdown, Form, Input } from "semantic-ui-react";
import Accordion from "./Accordion";
import "./App.css";

function App() {
  const [active, setActive] = useState(false);
  const [pythonFetchTime, setPythonFetchTime] = useState(0);
  const [jsFetchTime, setJSFetchTime] = useState(0);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    let start = performance.now();
    fetch("http://127.0.0.1:8080/python/all-shippers", {
      method: "GET",
    })
      .then((response) => {
        console.log(response);
        if (response.ok) return response.json();
      })
      .then((data) => {
        let end = performance.now();
        setPythonFetchTime(end - start);
        console.log("end of python fetch: ", end - start);
        console.log(data);
      });
  }, [active]);

  useEffect(() => {
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
  }, []);

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
              <label className="label">Language</label>
              <Dropdown
                placeholder="Select Language"
                fluid
                selection
                options={languages}
              />
            </Form.Field>
            <Form.Field>
              <label className="label">Query Type</label>
              <Dropdown
                placeholder="Select Type"
                fluid
                selection
                options={options}
              />
            </Form.Field>
            <Form.Field>
              <label className="label"># of Repetitions</label>
              <Input fluid placeholder={0} type="number" />
            </Form.Field>
          </Form.Group>
        </Form>
        <Form className="form">
          <Form.Group widths="equal">
            <Form.Field>
              <Dropdown
                placeholder="Select Language"
                fluid
                selection
                options={languages}
              />
            </Form.Field>
            <Form.Field>
              <Dropdown
                placeholder="Select Type"
                fluid
                selection
                options={options}
              />
            </Form.Field>
            <Form.Field>
              <Input fluid placeholder={0} type="number" />
            </Form.Field>
          </Form.Group>
        </Form>
        <Form className="form">
          <Form.Group widths="equal">
            <Form.Field>
              <Dropdown
                placeholder="Select Language"
                fluid
                selection
                options={languages}
              />
            </Form.Field>
            <Form.Field>
              <Dropdown
                placeholder="Select Type"
                fluid
                selection
                options={options}
              />
            </Form.Field>
            <Form.Field>
              <Input fluid placeholder={0} type="number" />
            </Form.Field>
          </Form.Group>
        </Form>
        <Button positive>Run Queries</Button>
      </div>
      <div>
        <Accordion />
      </div>
    </div>
  );
}

export default App;
