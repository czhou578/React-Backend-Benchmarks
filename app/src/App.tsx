import { useState } from "react";
import { Button, Dropdown, Form, Icon, Input } from "semantic-ui-react";
import AccordionExampleFluid from "./Accordion";
import "./App.css";

function App() {
  const [pythonFetchTime, setPythonFetchTime] = useState(0);
  const [jsFetchTime, setJSFetchTime] = useState(0);
  const [goFetchTime, setGOFetchTime] = useState(0);

  const [pythonFetchedData, setPythonFetchedData] = useState(null);
  const [jsFetchedData, setJSFetchedData] = useState<any>([]);
  const [goFetchedData, setGOFetchedData] = useState<any>([]);

  const [languageSequence, setLanguageSequence] = useState("");
  const [queryType, setQueryType] = useState("");
  const [iterations, setIterations] = useState(0);

  const [completedRun, setCompletedRun] = useState("");

  const getAllShippersGo = (iterations: number) => {
    let start = performance.now();

    let fetches = [];

    for (let i = 0; i < iterations; i++) {
      fetches.push(
        fetch("http://127.0.0.1:8083/go/all-shippers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          console.log(response);
          if (response.ok) return response.json();
        })
      );
    }

    Promise.all(fetches).then((data) => {
      console.log(data);
      let end = performance.now();
      setGOFetchTime(end - start);
      setGOFetchedData(data);
    });

    setCompletedRun("Completed!");
  };

  const getAllShippersJS = (iterations: number) => {
    let fetches = [];
    let start = performance.now();

    for (let i = 0; i < iterations; i++) {
      fetches.push(
        fetch("http://127.0.0.1:3001/northwind/javascript/all-shippers", {
          method: "GET",
        }).then((response) => {
          console.log(response);
          if (response.ok) return response.json();
        })
      );
    }

    Promise.all(fetches).then((data) => {
      let end = performance.now();
      setJSFetchTime(end - start);
      setJSFetchedData(data);
    });

    setCompletedRun("Completed!");
  };

  const getAllShippersPython = (iterations: number) => {
    let start = performance.now();

    fetch(
      "http://127.0.0.1:8080/python/all-shippers?" +
        new URLSearchParams({
          iteration: iterations.toString(),
        }),
      {
        method: "GET",
      }
    )
      .then((response: any) => {
        console.log(response);
        if (response.ok) return response.json();
      })
      .then((data) => {
        let end = performance.now();
        setPythonFetchTime(end - start);
        setPythonFetchedData(data);
      });

    setCompletedRun("Completed!");
  };

  const getCountNumEmployeeIdJS = (iterations: number) => {
    let fetches = [];
    let start = performance.now();

    for (let i = 0; i < iterations; i++) {
      fetches.push(
        fetch("http://127.0.0.1:3001/northwind/javascript/num-employeeId", {
          method: "GET",
        }).then((response) => {
          if (response.ok) return response.json();
        })
      );
    }

    Promise.all(fetches).then((data) => {
      let end = performance.now();
      setJSFetchTime(end - start);
      setJSFetchedData(data);
    });

    setCompletedRun("Completed!");
  };

  const getCountNumEmployeeIdGo = (iterations: number) => {
    let fetches = [];
    let start = performance.now();
    console.log(start);

    for (let i = 0; i < iterations; i++) {
      fetches.push(
        fetch("http://127.0.0.1:8083/go/count-employee-id", {
          method: "GET",
        }).then((response) => {
          if (response.ok) return response.json();
        })
      );
    }

    Promise.all(fetches).then((data) => {
      let end = performance.now();

      setGOFetchedData(data);
      setGOFetchTime(end - start);
    });

    setCompletedRun("Completed!");
  };

  const getCountNumEmployeeIdPython = (iterations: number) => {
    let start = performance.now();
    console.log(start);

    fetch(
      "http://127.0.0.1:8080/python/count-employee-id?" +
        new URLSearchParams({
          iteration: iterations.toString(),
        }),
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        let end = performance.now();
        setPythonFetchedData(data);
        setPythonFetchTime(end - start);
      });

    setCompletedRun("Completed!");
  };

  const insertNewCategoryGo = (iterations: number) => {
    let fetches = [];
    let start = performance.now();
    console.log(start);

    for (let i = 0; i < iterations; i++) {
      fetches.push(
        fetch("http://127.0.0.1:8083/go/new-category", {
          method: "PUT",
        }).then((response) => {
          if (response.ok) return response.json();
        })
      );
    }

    Promise.all(fetches).then((data) => {
      console.log(data);
      let end = performance.now();

      setGOFetchedData(data);
      setGOFetchTime(end - start);
    });

    setCompletedRun("Completed!");
  };

  const insertNewCategoryPython = (iterations: number) => {
    let start = performance.now();
    console.log(start);

    fetch(
      "http://127.0.0.1:8080/python/new-category?" +
        new URLSearchParams({
          iteration: iterations.toString(),
        }),
      {
        method: "PUT",
      }
    )
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((data) => {
        let end = performance.now();
        setPythonFetchedData(data);
        setPythonFetchTime(end - start);
      });

    setCompletedRun("Completed!");
  };

  const insertNewCategoryJS = (iterations: number) => {
    let fetches = [];
    let start = performance.now();

    for (let i = 0; i < iterations; i++) {
      fetches.push(
        fetch("http://127.0.0.1:3001/northwind/javascript/new-category", {
          method: "GET",
        }).then((response) => {
          if (response.ok) return response.json();
        })
      );
    }

    Promise.all(fetches).then((data) => {
      let end = performance.now();
      setJSFetchTime(end - start);
      setJSFetchedData(data);
    });

    setCompletedRun("Completed!");
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
    else if (languageSequence === "Go" && queryType === "INSERT")
      insertNewCategoryGo(iterations);
    else if (languageSequence === "Python" && queryType === "INSERT")
      insertNewCategoryPython(iterations);
    else if (languageSequence === "JavaScript" && queryType === "INSERT")
      insertNewCategoryJS(iterations);
    else if (
      languageSequence === "JavaScript, Go, Python" &&
      queryType === "GET"
    ) {
      getAllShippersJS(iterations);
      getAllShippersGo(iterations);
      getAllShippersPython(iterations);
    } else if (
      languageSequence === "JavaScript, Go, Python" &&
      queryType === "JOIN"
    ) {
      getCountNumEmployeeIdJS(iterations);
      getCountNumEmployeeIdGo(iterations);
      getCountNumEmployeeIdPython(iterations);
    } else if (
      languageSequence === "JavaScript, Go, Python" &&
      queryType === "INSERT"
    ) {
      insertNewCategoryJS(iterations);
      insertNewCategoryGo(iterations);
      insertNewCategoryPython(iterations);
    }
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
    {
      key: "INSERT",
      text: "INSERT",
      value: "INSERT",
    },
    {
      key: "DELETE",
      text: "DELETE",
      value: "DELETE",
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
                onChange={(_, data) => {
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
                onChange={(_, data) => {
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
                onChange={(_, data) => {
                  setIterations(parseInt(data.value));
                }}
              />
            </Form.Field>
          </Form.Group>
        </Form>
        <Button
          positive
          onClick={() => {
            setCompletedRun("");
            setTimeout(() => {
              conditionCallRoute();
            }, 500);
          }}
        >
          Run Queries
        </Button>
      </div>
      <div className="accordion">
        {completedRun !== "" ? (
          <div>
            <span
              style={{ color: "white", fontSize: "20px", paddingTop: "10px" }}
            >
              {completedRun}
            </span>
            <span style={{ marginLeft: "20px" }}>
              <Icon name="check" size="huge" color="green" />
            </span>
          </div>
        ) : null}
        <AccordionExampleFluid
          jsTime={jsFetchTime}
          jsData={jsFetchedData}
          goTime={goFetchTime}
          goData={goFetchedData}
          pythonTime={pythonFetchTime}
          pythonData={pythonFetchedData}
        />
      </div>
    </div>
  );
}

export default App;
