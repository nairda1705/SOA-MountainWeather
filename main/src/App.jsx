import React from "react";
import ReactDOM from "react-dom";
import Peaks from "./components/Peaks"

const App = () => (
  <div className="container">
  <Peaks/>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));