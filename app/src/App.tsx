import { useEffect, useState } from "react";
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
        console.log(end - start);
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
        console.log(end - start);
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
        console.log(end - start);
        console.log(data);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setActive(true)}>Run Tests</button>
        <p>{pythonFetchTime}</p>
      </header>
    </div>
  );
}

export default App;
