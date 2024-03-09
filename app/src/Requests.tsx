import { Form, Input, Button, Icon } from "semantic-ui-react";
import "./requests.css";
import AccordionExampleFluid from "./Accordion";
import { useState } from "react";

export default function Requests() {
  const [iterations, setIterations] = useState(0);
  const [completedRun, setCompletedRun] = useState("");
  const [pythonFetchTime, setPythonFetchTime] = useState(0);
  const [jsFetchTime, setJSFetchTime] = useState(0);
  const [goFetchTime, setGOFetchTime] = useState(0);

  const [pythonFetchedData, setPythonFetchedData] = useState(null);
  const [jsFetchedData, setJSFetchedData] = useState<any>([]);
  const [goFetchedData, setGOFetchedData] = useState<any>([]);
  
  const jsRequest = () => {
    let fetches = [];

    for (let i = 0; i < 5; i++) {
      fetches.push(
        fetch("https://randomuser.me/api/?results=20").then((response) => {
          console.log(response);
          if (response.ok) return response.json();
        })
      );
    }
    Promise.all(fetches).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className="container">
      <h1 style={{ color: "white" }}>Requests</h1>
      <div style={{ color: "white", marginBottom: "10px" }}>
        <h2>Using the Random user.me API and running queries</h2>
      </div>
      <div className="reqForm-wrapper">
        <Form className="reqForm">
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
        </Form>
        <Button
          positive
          onClick={() => {
            setCompletedRun("");
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
