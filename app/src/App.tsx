import { BrowserRouter, Routes, Route } from "react-router-dom";
import GraphQLTest from "./GraphQLTest";
import Home from "./Home";
import PostGresTest from "./PostGresTest";
import Login from "./Login";
import Requests from "./Requests";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/postgres" element={<PostGresTest />} />
        <Route path="/graphql" element={<GraphQLTest />} />
      </Routes>
    </BrowserRouter>
  );
}
