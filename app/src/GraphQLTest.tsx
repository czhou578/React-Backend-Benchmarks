import { useState, useEffect } from "react";
import { Form, Dropdown, Button, Input, Icon } from "semantic-ui-react";
import AccordionExampleFluid from "./Accordion";

export default function GraphQLTest() {
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
  const getJsRoute = "http://127.0.0.1:3001/spacex/graphql";
  const getPythonRoute = "http://127.0.0.1:8080/python/graphql/get?";
  const getGoRoute = "http://127.0.0.1:8083/go/graphql/get";

  useEffect(() => {
    console.log("adsfadf");
    fetch(getGoRoute)
      .then((response) => {
        if (response.ok) return response.json();
      })
      .then((res) => console.log(res));
  }, []);

  const options = [
    {
      key: "GET",
      text: "GET",
      value: "GET",
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
    if (languageSequence === "JavaScript" && queryType === "GET")
      jsRouteWrapper(iterations, getJsRoute, "GET");
    else if (languageSequence === "Python" && queryType === "GET")
      pythonRouteWrapper(iterations, getPythonRoute, "GET");
  };

  return (
    <div style={{ backgroundColor: "#282c34", height: "110vh" }}>
      <header className="App-header">
        <h1>Test API Response Times (GraphQL)</h1>
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
          <div style={{ marginLeft: "100px" }}>
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
