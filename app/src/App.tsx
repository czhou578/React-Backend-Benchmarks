import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GraphQLTest } from "./GraphQLTest";
import Home from './Home'

export default function App() {
    return (
        <BrowserRouter basename="/home">
            <Routes>
                <Route path="/rest" element={<Home />} />
                <Route path="/graphql" element={<GraphQLTest />} />
            </Routes>
        </BrowserRouter>
    )
}