import React, {Component} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Routes, Link } from "react-router-dom"
import "./App.css"

import AddStudentBMI from "./components/add-student.component"
import StudentBMI from "./components/student.component"
import StudentBMIList from "./components/students-list.component"

export default class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            BMI Recorder
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/studentBmis"} className="nav-link">
                Report
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Data
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<StudentBMIList/>}/>
            <Route path="/studentBmis" element={<StudentBMIList/>}/>
            <Route path="/add" element={<AddStudentBMI/>}/>
            <Route path="/studentBmis/:id" element={<StudentBMI/>}/>
          </Routes>
        </div>
      </div>
    )
  }
}