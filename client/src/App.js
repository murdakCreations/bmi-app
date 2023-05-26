import React, { Component } from "react";
import {Route, Routes,Link} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <a href="">
            Home
          </a>
          <div>
            <li>
              <Link to={""}>
                Student BMI
              </Link>
            </li>
            <li>
              <Link to={""}>
                Add
              </Link>
            </li>
          </div>
        </nav>
        <div>
          <Routes>
            <Route path=""/>
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;