import React, { Component } from "react"
import StudentBMIDataService from "../services/student.service"

export default class AddStudent extends Component {
    constructor(props) {
        super(props)
        this.onChangeStudentID = this.onChangeStudentID.bind(this)
        this.onChangeStudentName = this.onChangeStudentName.bind(this)
        this.onChangeWeight = this.onChangeWeight.bind(this)
        this.onChangeHeight = this.onChangeHeight.bind(this)
        this.computeBMIVal = this.computeBMIVal.bind(this)
        this.saveStudent = this.saveStudent.bind(this)
        this.newStudent = this.newStudent.bind(this)

        this.state = {
            studentID: 0,
            studentName: "",
            weight: 0.0, 
            height: 0.0,
            BMIVal: "computing",
            submitted: false
        }
    }

    onChangeStudentID(e) {
        this.setState({
            studentID: e.target.value
        })
    }

    onChangeStudentName(e) {
        this.setState({
            studentName: e.target.value
        })
    }

    onChangeWeight(e) {
        this.setState(
            {weight: e.target.value},
            () =>this.computeBMIVal()
        )
    }

    onChangeHeight(e) {
        
        this.setState(
            {height: e.target.value},
            () =>this.computeBMIVal()
        )
    }

    computeBMIVal() {
        if(this.state.weight>0.0 && this.state.height>0.0){
            let w = this.state.weight
            let h = this.state.height
            let comp = Number(w/h**2)
            if(comp < 15){
                this.setState({
                    BMIVal: "Very severely underweight"
                })
            }
            if(comp >= 15 && comp <=16){
                this.setState({
                    BMIVal: "Severely underweight"
                })
            }
            if(comp > 16 && comp <= 18.5){
                this.setState({
                    BMIVal: "Underweight"
                })
            }
            if(comp > 18.5 && comp <= 25){
                this.setState({
                    BMIVal: "Normal"
                })
            }
            if(comp > 25 && comp <= 30){
                this.setState({
                    BMIVal: "Overweight"
                })
            }
            if(comp > 30 && comp <= 35){
                this.setState({
                    BMIVal: "Moderately Overweight"
                })
            }
            if(comp > 35 && comp <= 40){
                this.setState({
                    BMIVal: "Severely Overweight"
                })
            }
            if(comp > 40){
                this.setState({
                    BMIVal: "Very severely obese"
                })
            }
        }
    }

    saveStudent() {
        var data = {
            studentID: this.state.studentID,
            studentName: this.state.studentName,
            weight: this.state.weight,
            height: this.state.height,
            BMIVal: this.state.BMIVal
        }

        StudentBMIDataService.create(data)
            .then(response => {
                this.setState({
                    studentID: response.data.studentID,
                    studentName: response.data.studentName,
                    weight: response.data.weight,
                    height: response.data.height,
                    BMIVal: response.data.BMIVal,
                    submitted: true
                })
                console.log(response.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    newStudent() {
        this.setState({
            studentID: 0,
            studentName: "",
            weight: 0.0, 
            height: 0.0,
            BMIVal: "",
            submitted: false
        })
    }

    render()  {
        return(
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newStudent}>
                            Add
                        </button>
                    </div>
                ):(
                    <div>
                        <div className="form-group">
                            <label htmlFor="studentID">Student ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="studentID"
                                required
                                value={this.state.studentID}
                                onChange={this.onChangeStudentID}
                                name="studentID"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="studentName">Student Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="studentName"
                                required
                                value={this.state.studentName}
                                onChange={this.onChangeStudentName}
                                name="studentName"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="weight">Weight</label>
                            <input
                                type="text"
                                className="form-control"
                                id="weight"
                                required
                                value={this.state.weight}
                                onChange={this.onChangeWeight}
                                name="weight"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="height">Height</label>
                            <input
                                type="text"
                                className="form-control"
                                id="height"
                                required
                                value={this.state.height}
                                onChange={this.onChangeHeight}
                                name="height"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="BMIVal">BMI</label>
                            <input
                                type="text"
                                className="form-control"
                                id="BMIVal"
                                value={this.state.BMIVal}
                                name="BMIVal"
                            />
                        </div>
                        <button onClick={this.saveStudent} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        )
    }
}