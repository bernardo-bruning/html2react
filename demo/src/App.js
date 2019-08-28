import React from "react";
import "./App.css";
import HtmlParser from "./HtmlParser";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/parse" component={HtmlParser} />
      </Router>
    </div>
  );
}

export default App;
