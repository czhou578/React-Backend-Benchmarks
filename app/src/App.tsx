import { useState } from "react";
import { Button, Dropdown, Form, Input } from "semantic-ui-react";
import Accordion from "./Accordion";
import "./App.css";

interface timeObjDef {
  [key: string]: number;
}

function App() {
  const [active, setActive] = useState(false);
  const [pythonFetchTime, setPythonFetchTime] = useState({});
  const [jsFetchTime, setJSFetchTime] = useState({});
  const [goFetchTime, setGOFetchTime] = useState({});

  const [languageSequence, setLanguageSequence] = useState("");
  const [queryType, setQueryType] = useState("");
  const [iterations, setIterations] = useState(0);

  const getAllShippersGo = (iterations: number) => {
    let timeObj: timeObjDef = {};

    let start = performance.now();
    console.log(start);

    let fetches = [];

    for (let i = 0; i < iterations; i++) {
      fetches.push(
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
            timeObj[(i + 1).toString()] = end - start;
            // setGOFetchTime({ ...goFetchTime, [i + 1]: end - start });
            // console.log(data);
          })
      );
    }

    Promise.all(fetches).then(() => {
      setGOFetchTime(timeObj);
      console.log(JSON.stringify(timeObj));
    });
  };

  const getAllShippersJS = (iterations: number) => {
    let timeObj: timeObjDef = {};

    let fetches = [];
    let start = performance.now();
    console.log(start);

    for (let i = 0; i < iterations; i++) {
      fetches.push(
        fetch("http://127.0.0.1:3001/northwind/javascript/all-shippers", {
          method: "GET",
        })
          .then((response) => {
            console.log(response);
            if (response.ok) return response.json();
          })
          .then((data) => {
            let end = performance.now();
            // setJSFetchTime(end - start);
            // console.log("end of js fetch: ", end - start);
            console.log(data);
          })
      );
    }

    Promise.all(fetches).then(() => {
      setJSFetchTime(timeObj);
      console.log(JSON.stringify(timeObj));
    });
  };

  const getAllShippersPython = (iterations: number) => {
    let timeObj: timeObjDef = {};

    let fetches = [];
    let start = performance.now();
    console.log(start);

    for (let i = 0; i < iterations; i++) {
      fetches.push(
        fetch("http://127.0.0.1:8080/python/all-shippers", {
          method: "GET",
        })
          .then((response) => {
            console.log(response);
            if (response.ok) return response.json();
          })
          .then((data) => {
            let end = performance.now();
            // setPythonFetchTime(end - start);
            // console.log("end of python fetch: ", end - start);
            console.log(data);
          })
      );
    }

    Promise.all(fetches).then(() => {
      setPythonFetchTime(timeObj);
      console.log(JSON.stringify(timeObj));
    });
  };

  const getCountNumEmployeeIdJS = (iterations: number) => {
    let timeObj: timeObjDef = {};

    let fetches = [];
    let start = performance.now();
    console.log(start);

    for (let i = 0; i < iterations; i++) {
      fetches.push(
        fetch("http://127.0.0.1:3001/northwind/javascript/num-employeeId", {
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
          })
      );
    }

    Promise.all(fetches).then(() => {
      setPythonFetchTime(timeObj);
      console.log(JSON.stringify(timeObj));
    });
  };

  const getCountNumEmployeeIdGo = (iterations: number) => {
    let timeObj: timeObjDef = {};

    let fetches = [];
    let start = performance.now();
    console.log(start);

    for (let i = 0; i < iterations; i++) {
      fetches.push(
        fetch("http://127.0.0.1:8083/go/count-employee-id", {
          method: "GET",
        })
          .then((response) => {
            console.log(response);
            if (response.ok) return response.json();
          })
          .then((data) => {
            let end = performance.now();
            setGOFetchTime(end - start);
            console.log("end of go fetch: ", end - start);
            console.log(data);
          })
      );
    }

    Promise.all(fetches).then(() => {
      setPythonFetchTime(timeObj);
      console.log(JSON.stringify(timeObj));
    });
  };

  const getCountNumEmployeeIdPython = (iterations: number) => {
    let timeObj: timeObjDef = {};

    let fetches = [];
    let start = performance.now();
    console.log(start);

    for (let i = 0; i < iterations; i++) {
      fetches.push(
        fetch("http://127.0.0.1:8080/python/count-employee-id", {
          method: "GET",
        })
          .then((response) => {
            console.log(response);
            if (response.ok) return response.json();
          })
          .then((data) => {
            let end = performance.now();
            setGOFetchTime(end - start);
            console.log("end of go fetch: ", end - start);
            console.log(data);
          })
      );
    }

    Promise.all(fetches).then(() => {
      setPythonFetchTime(timeObj);
      console.log(JSON.stringify(timeObj));
    });
  };

  const conditionCallRoute = () => {
    if (languageSequence === "Go" && queryType === "GET")
      getAllShippersGo(iterations);
    else if (languageSequence === "JavaScript" && queryType === "GET")
      getAllShippersJS(iterations);
    else if (languageSequence === "Python" && queryType === "GET")
      getAllShippersPython(iterations);
    else if (languageSequence === "Go" && queryType === "JOIN")
      getCountNumEmployeeIdGo(iterations);
    else if (languageSequence === "JavaScript" && queryType === "JOIN")
      getCountNumEmployeeIdJS(iterations);
    else if (languageSequence === "Python" && queryType === "JOIN")
      getCountNumEmployeeIdPython(iterations);
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
        <Button positive onClick={() => conditionCallRoute()}>
          Run Queries
        </Button>
      </div>
      <div className="accordion">
        <Accordion
          jsTime={jsFetchTime}
          goTime={goFetchTime}
          pythonTime={pythonFetchTime}
        />
      </div>
    </div>
  );
}

export default App;
