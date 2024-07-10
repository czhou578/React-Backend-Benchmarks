import { useState } from "react";
import { Button, Dropdown, Form, Icon, Input } from "semantic-ui-react";
import AccordionExampleFluid from "./Accordion";
import { Link } from "react-router-dom";

function App() {

  const [pythonFetchTime, setPythonFetchTime] = useState(0);
  const [jsFetchTime, setJSFetchTime] = useState(0);
  const [goFetchTime, setGOFetchTime] = useState(0);
  const [javaFetchTime, setJavaFetchTime] = useState(0);

  const [pythonFetchedData, setPythonFetchedData] = useState(null);
  const [jsFetchedData, setJSFetchedData] = useState<any>([]);
  const [goFetchedData, setGOFetchedData] = useState<any>([]);
  const [javaFetchedData, setJavaFetchedData] = useState<any>([]);

  const [languageSequence, setLanguageSequence] = useState("");
  const [queryType, setQueryType] = useState("");
  const [iterations, setIterations] = useState(0);

  const [completedRun, setCompletedRun] = useState("");
  const [cache, setCache] = useState("")

  const getJavaRoute = "http://192.168.81.153:9000/java/shippers?"
  const insertJavaRoute = "http://192.168.81.153:9000/java/category?"
  const updateJavaRoute = "http://192.168.81.153:9000/java/product?"
  const joinJavaRoute = "http://192.168.81.153:9000/java/employee-region?"
  const deleteJavaRoute = "http://192.168.81.153:9000/java/delete-sales?"

  const getGoRoute = "http://192.168.81.153:8083/go/all-shippers";
  const insertGoRoute = "http://192.168.81.153:8083/go/new-category";
  const joinGoRoute = "http://192.168.81.153:8083/go/count-employee-id";
  const updateGoRoute = "http://192.168.81.153:8083/go/update-customer";
  const deleteGoRoute = "http://192.168.81.153:8083/go/delete-salesorder";

  const getJSRoute =
    "http://192.168.81.153:3001/northwind/javascript/all-shippers";
  const joinJSRoute =
    "http://192.168.81.153:3001/northwind/javascript/num-employeeId";
  const insertJSRoute =
    "http://192.168.81.153:3001/northwind/javascript/new-category";
  const updateJSRoute =
    "http://192.168.81.153:3001/northwind/javascript/update-customer";
  const deleteJSRoute =
    "http://192.168.81.153:3001/northwind/javascript/delete-salesorder";

  const getPythonRoute = "http://192.168.81.153:8080/python/all-shippers?";
  const joinPythonRoute =
    "http://192.168.81.153:8080/python/count-employee-id?";
  const insertPythonRoute = "http://192.168.81.153:8080/python/new-category?";
  const updatePythonRoute =
    "http://192.168.81.153:8080/python/update-customer?";
  const deletePythonRoute =
    "http://192.168.81.153:8080/python/delete-salesorder?";

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

  const javaRouteWrapper = (
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
        setJavaFetchTime(end - start);
        setJavaFetchedData(data);
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
    else if (languageSequence === "Java" && queryType === "GET")
      javaRouteWrapper(iterations, getJavaRoute, "GET");

    else if (languageSequence === "Go" && queryType === "JOIN")
      goRouteWrapper(iterations, joinGoRoute, "GET");
    else if (languageSequence === "JavaScript" && queryType === "JOIN")
      jsRouteWrapper(iterations, joinJSRoute, "GET");
    else if (languageSequence === "Python" && queryType === "JOIN")
      pythonRouteWrapper(iterations, joinPythonRoute, "GET");
    else if (languageSequence == "Java" && queryType === "JOIN")
      javaRouteWrapper(iterations, joinJavaRoute, "GET")

    else if (languageSequence === "Go" && queryType === "INSERT")
      goRouteWrapper(iterations, insertGoRoute, "POST");
    else if (languageSequence === "Python" && queryType === "INSERT")
      pythonRouteWrapper(iterations, insertPythonRoute, "POST");
    else if (languageSequence === "JavaScript" && queryType === "INSERT")
      jsRouteWrapper(iterations, insertJSRoute, "POST");
    else if (languageSequence === "Java" && queryType === "INSERT")
      javaRouteWrapper(iterations, insertJavaRoute, "POST");

    else if (languageSequence === "Go" && queryType === "UPDATE")
      goRouteWrapper(iterations, updateGoRoute, "PUT");
    else if (languageSequence === "JavaScript" && queryType === "UPDATE")
      jsRouteWrapper(iterations, updateJSRoute, "PUT");
    else if (languageSequence === "Python" && queryType === "UPDATE")
      pythonRouteWrapper(iterations, updatePythonRoute, "PUT");
    else if (languageSequence === "Java" && queryType === "UPDATE")
      javaRouteWrapper(iterations, updateJavaRoute, "PUT");

    else if (languageSequence === "Go" && queryType === "DELETE")
      goRouteWrapper(iterations, deleteGoRoute, "DELETE");
    else if (languageSequence === "JavaScript" && queryType === "DELETE")
      jsRouteWrapper(iterations, deleteJSRoute, "DELETE");
    else if (languageSequence === "Python" && queryType === "DELETE")
      pythonRouteWrapper(iterations, deletePythonRoute, "DELETE");
    else if (languageSequence === "Java" && queryType === "DELETE")
      javaRouteWrapper(iterations, deleteJavaRoute, "DELETE");

    else if (
      languageSequence === "JavaScript, Go, Python, Java" &&
      queryType === "GET"
    ) {
      jsRouteWrapper(iterations, getJSRoute, "GET");
      goRouteWrapper(iterations, getGoRoute, "GET");
      pythonRouteWrapper(iterations, getPythonRoute, "GET");
      javaRouteWrapper(iterations, getJavaRoute, "GET")

    } else if (
      languageSequence === "JavaScript, Go, Python, Java" &&
      queryType === "JOIN"
    ) {
      jsRouteWrapper(iterations, joinJSRoute, "GET");
      goRouteWrapper(iterations, joinGoRoute, "GET");
      pythonRouteWrapper(iterations, joinPythonRoute, "GET");
      javaRouteWrapper(iterations, joinJavaRoute, "GET")

    } else if (
      languageSequence === "JavaScript, Go, Python, Java" &&
      queryType === "INSERT"
    ) {
      jsRouteWrapper(iterations, insertJSRoute, "POST");
      goRouteWrapper(iterations, insertGoRoute, "POST");
      pythonRouteWrapper(iterations, insertPythonRoute, "POST");
      javaRouteWrapper(iterations, insertJavaRoute, "POST")

    } else if (
      languageSequence === "JavaScript, Go, Python, Java" &&
      queryType === "UPDATE"
    ) {
      jsRouteWrapper(iterations, updateJSRoute, "PUT");
      goRouteWrapper(iterations, updateGoRoute, "PUT");
      pythonRouteWrapper(iterations, updatePythonRoute, "PUT");
      javaRouteWrapper(iterations, updateJavaRoute, "PUT")
    } else if (
      languageSequence === "JavaScript, Go, Python, Java" &&
      queryType === "DELETE"
    ) {
      jsRouteWrapper(iterations, deleteJSRoute, "DELETE");
      goRouteWrapper(iterations, deleteGoRoute, "DELETE");
      pythonRouteWrapper(iterations, deletePythonRoute, "DELETE");
      javaRouteWrapper(iterations, deleteJavaRoute, "DELETE")
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
      key: "Java",
      text: "Java",
      value: "Java",
    },    
    {
      key: "JavaScript, Go, Python, Java",
      text: "JavaScript, Go, Python, Java",
      value: "JavaScript, Go, Python, Java",
    },
  ];

  const cacheOptions = [
    {
      key: "On",
      text: "On",
      value: "On",
    },
    {
      key: "Off",
      text: "Off",
      value: "Off",
    },   
  ]

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test API Response Times</h1>
        <Link to={"/graphql"}>
          <h3>Test API Response Times (GraphQL)</h3>
        </Link>
        {/* <Link to={"/requests"}>
          <h3>Test Fetch Response Time</h3>
        </Link> */}
      </header>
      <div style={{ color: "white", marginBottom: "10px" }}>
        <h2>Queries being Run</h2>
        <p>GET: SELECT * FROM shipper</p>
        <p>
          JOIN: SELECT count(employeeId) FROM employeeterritory NATURAL JOIN
          region NATURAL JOIN territory GROUP BY regionId
        </p>
        <p>
          INSERT: INSERT INTO category (categoryName, description, picture)
          VALUES ('Seafood', 'tasty', null)
        </p>
        <p>
          UPDATE: UPDATE product SET productName = 'Product 1' WHERE productId =
          55
        </p>
        <p>DELETE: DELETE from salesorder ORDER BY orderId DESC limit 1</p>
      </div>
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
            <Form.Field>
            <label className="label">Cache On/Off</label>
              <Dropdown
                placeholder="On/Off"
                fluid
                selection
                options={cacheOptions}
                onChange={(_, data) => {
                  setCache(data.value as string);
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
          javaTime={javaFetchTime}
          javaData={javaFetchedData}
        />
      </div>
    </div>
  );
}

export default App;
