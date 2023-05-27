import React, { Component } from "react"
import tutorialDataService from "../services/student.service"
import { Link } from "react-router-dom"

export default class StudentBMIList
 extends Component {
    constructor(props) {
        super(props)
        this.retrieveStudents = this.retrieveStudents.bind(this)
        this.refreshList = this.refreshList.bind(this)
        this.setActiveStudent = this.setActiveStudent.bind(this)
        this.removeAllStudents = this.removeAllStudents.bind(this)
        
        this.state = {
            studentBMIs: [],
            currentStudent: null,
            currentIndex: -1
        }
    }

    componentDidMount() {
        this.retrieveStudents()
    }

    retrieveStudents() {
        tutorialDataService.getAll()
            .then(response => {
                this.setState({
                    studentBMIs: response.data
                })
            })
            .catch(e => {
                console.log(e)
            })
    }

    refreshList() {
        this.retrieveStudents()
        this.setState({
            currentStudent: null,

            currentIndex: -1
        })
    }

    setActiveStudent(studentBMI, index) {
        this.setState({
            currentStudent: studentBMI,
            currentIndex: index
        })
    }

    removeAllStudents() {
        tutorialDataService.deleteAll()
            .then(response => {
                console.log(response.data)
                this.refreshList()
            })
            .catch(e => {
                console.log(e)
            })
    }

    
    render() {
        const { studentBMIs, currentStudent, currentIndex} = this.state
        
        return(
            <div className="list row">
                <div className="col-md-6">
                    <h4>Student BMI List</h4>
                    <ul className="list-group">
                        {studentBMIs &&
                            studentBMIs.map((studentBMI, index) => {
                                return <li
                                    className={"list-group-item" +
                                        (index === currentIndex ? "active": "")
                                    }
                                    onClick={() => this.setActiveStudent(studentBMI,index)}
                                    key={index}   
                                >
                                    {studentBMI.studentName}
                                </li>
                            })
                        }
                    </ul>
                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllStudents}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentStudent ? (
                        <div>
                            <h4>Student BMI</h4>
                            <div>
                                <label>
                                    <strong>Student ID:</strong>
                                </label>{"  "}
                                {currentStudent.studentID}
                            </div>
                            <div>
                                <label>
                                    <strong>Student Name:</strong>
                                </label>{"  "}
                                {currentStudent.studentName}
                            </div>
                            <div>
                                <label>
                                    <strong>BMI:</strong>
                                </label>{"  "}
                                {currentStudent.BMIVal}
                            </div>

                            <Link id="editBtn"
                                to={"/studentBmis/" + currentStudent.studentID}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ):(
                        <div>
                            <br/>
                            <p>Please click on a Student...</p>
                        </div>
                    )}
                </div>
                
            </div>
        )
    }
}