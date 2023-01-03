import { useState } from "react";
import { Button, Dropdown, Form, Icon, Input } from "semantic-ui-react";
import AccordionExampleFluid from "./Accordion";
import "./Home.css";

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

  const getGoRoute = "http://127.0.0.1:8083/go/all-shippers";
  const insertGoRoute = "http://127.0.0.1:8083/go/new-category";
  const joinGoRoute = "http://127.0.0.1:8083/go/count-employee-id";
  const updateGoRoute = "http://127.0.0.1:8083/go/update-customer";
  const deleteGoRoute = "http://127.0.0.1:8083/go/delete-salesorder";

  const getJSRoute = "http://127.0.0.1:3001/northwind/javascript/all-shippers";
  const joinJSRoute =
    "http://127.0.0.1:3001/northwind/javascript/num-employeeId";
  const insertJSRoute =
    "http://127.0.0.1:3001/northwind/javascript/new-category";
  const updateJSRoute =
    "http://127.0.0.1:3001/northwind/javascript/update-customer";
  const deleteJSRoute =
    "http://127.0.0.1:3001/northwind/javascript/delete-salesorder";

  const getPythonRoute = "http://127.0.0.1:8080/python/all-shippers?";
  const joinPythonRoute = "http://127.0.0.1:8080/python/count-employee-id?";
  const insertPythonRoute = "http://127.0.0.1:8080/python/new-category?";
  const updatePythonRoute = "http://127.0.0.1:8080/python/update-customer?";
  const deletePythonRoute = "http://127.0.0.1:8080/python/delete-salesorder?";

  const goRouteWrapper = (
    iterations: number,
    routeURL: string,
    method: string
  ) => {
    let start = performance.now();

    let fetches = [];

    for (let i = 0; i < iterations; i++) {
      fetches.push(
        fetch(routeURL, {
          method: method,
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

  const jsRouteWrapper = (
    iterations: number,
    routeURL: string,
    method: string
  ) => {
    let start = performance.now();

    let fetches = [];

    for (let i = 0; i < iterations; i++) {
      fetches.push(
        fetch(routeURL, {
          method: method,
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
      let end = performance.now();
      setJSFetchTime(end - start);
      setJSFetchedData(data);
    });

    setCompletedRun("Completed!");
  };

  const pythonRouteWrapper = (
    iterations: number,
    routeURL: string,
    method: string
  ) => {
    let start = performance.now();

    fetch(
      routeURL +
        new URLSearchParams({
          iteration: iterations.toString(),
        }),
      {
        method: method,
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

  const conditionCallRoute = () => {
    if (languageSequence === "Go" && queryType === "GET")
      goRouteWrapper(iterations, getGoRoute, "GET");
    else if (languageSequence === "JavaScript" && queryType === "GET")
      jsRouteWrapper(iterations, getJSRoute, "GET");
    else if (languageSequence === "Python" && queryType === "GET")
      pythonRouteWrapper(iterations, getPythonRoute, "GET");
    else if (languageSequence === "Go" && queryType === "JOIN")
      goRouteWrapper(iterations, joinGoRoute, "GET");
    else if (languageSequence === "JavaScript" && queryType === "JOIN")
      jsRouteWrapper(iterations, joinJSRoute, "GET");
    else if (languageSequence === "Python" && queryType === "JOIN")
      pythonRouteWrapper(iterations, joinPythonRoute, "GET");
    else if (languageSequence === "Go" && queryType === "INSERT")
      goRouteWrapper(iterations, insertGoRoute, "POST");
    else if (languageSequence === "Python" && queryType === "INSERT")
      pythonRouteWrapper(iterations, insertPythonRoute, "POST");
    else if (languageSequence === "JavaScript" && queryType === "INSERT")
      jsRouteWrapper(iterations, insertJSRoute, "GET");
    else if (languageSequence === "Go" && queryType === "UPDATE")
      goRouteWrapper(iterations, updateGoRoute, "PUT");
    else if (languageSequence === "JavaScript" && queryType === "UPDATE")
      jsRouteWrapper(iterations, updateJSRoute, "PUT");
    else if (languageSequence === "Python" && queryType === "UPDATE")
      pythonRouteWrapper(iterations, updatePythonRoute, "PUT");
    else if (languageSequence === "Go" && queryType === "DELETE")
      goRouteWrapper(iterations, deleteGoRoute, "DELETE");
    else if (languageSequence === "JavaScript" && queryType === "DELETE")
      jsRouteWrapper(iterations, deleteJSRoute, "DELETE");
    else if (languageSequence === "Python" && queryType === "DELETE")
      pythonRouteWrapper(iterations, deletePythonRoute, "DELETE");
    else if (
      languageSequence === "JavaScript, Go, Python" &&
      queryType === "GET"
    ) {
      jsRouteWrapper(iterations, getJSRoute, "GET");
      goRouteWrapper(iterations, getGoRoute, "GET");
      pythonRouteWrapper(iterations, getPythonRoute, "GET");
    } else if (
      languageSequence === "JavaScript, Go, Python" &&
      queryType === "JOIN"
    ) {
      jsRouteWrapper(iterations, joinJSRoute, "GET");
      goRouteWrapper(iterations, joinGoRoute, "GET");
      pythonRouteWrapper(iterations, joinPythonRoute, "GET");
    } else if (
      languageSequence === "JavaScript, Go, Python" &&
      queryType === "INSERT"
    ) {
      jsRouteWrapper(iterations, insertJSRoute, "GET");
      goRouteWrapper(iterations, insertGoRoute, "GET");
      pythonRouteWrapper(iterations, joinPythonRoute, "GET");
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
      key: "UPDATE",
      text: "UPDATE",
      value: "UPDATE",
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
