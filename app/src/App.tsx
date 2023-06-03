import { BrowserRouter, Routes, Route } from "react-router-dom";
import GraphQLTest from "./GraphQLTest";
import Home from "./Home";
import PostGresTest from "./PostGresTest";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/postgres" element={<PostGresTest />} />
        <Route path="/graphql" element={<GraphQLTest />} />
      </Routes>
    </BrowserRouter>
  );
}
