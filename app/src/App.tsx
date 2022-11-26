import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("http://127.0.0.1:8080/all-shippers", {
      method: "GET",
    })
      .then((response) => {
        console.log(response);
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
