import React, { Component } from "react";
import StudentBMIDataService from "../services/student.service";
import { withRouter } from '../common/with-router';

class StudentBMI extends Component {
  constructor(props) {
    super(props);
    this.onChangeStudentID = this.onChangeStudentID.bind(this);
    this.onChangeStudentName = this.onChangeStudentName.bind(this);
    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
    this.getStudent = this.getStudent.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.computeBMIVal = this.computeBMIVal.bind(this)

    this.state = {
      currentStudent: {
        studentID: 0,
        studentName: "",
        weight: 0.0,
        height: 0.0,
        BMIVal: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getStudent(this.props.router.params.id);
  }

  onChangeStudentID(e) {
    const id = e.target.value;

    this.setState(function(prevState) {
      return {
        currentStudent: {
          ...prevState.currentStudent,
          studentID: id
        }
      };
    });
  }

  onChangeStudentName(e) {
    const name = e.target.value;
    
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        studentName: name
      }
    }));
  }

  onChangeWeight(e) {
    const weight = e.target.value;
    
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        weight: weight
      }
    }),
    () =>this.computeBMIVal()
    );
  }

  onChangeHeight(e) {
    const height = e.target.value;
    
    this.setState(prevState => ({
      currentStudent: {
        ...prevState.currentStudent,
        height: height
      }
    }),
    () =>this.computeBMIVal()
    );
  }

  getStudent(studentID) {
    StudentBMIDataService.get(studentID)
      .then(response => {
        this.setState({
          currentStudent: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateStudent() {
    StudentBMIDataService.update(
      this.state.currentStudent.studentID,
      this.state.currentStudent
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The student data was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteStudent() {    
    StudentBMIDataService.delete(this.state.currentStudent.studentID)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/studentBmis');
      })
      .catch(e => {
        console.log(e);
      });
  }

    computeBMIVal() {
      if(this.state.currentStudent.weight>0.0 && this.state.currentStudent.height>0.0){
          let w = this.state.currentStudent.weight
          let h = this.state.currentStudent.height
          let comp = Number(w/h**2)
          if(comp < 15){
            this.setState(prevState => ({
              currentStudent: {
                ...prevState.currentStudent,
                BMIVal: "Very severely underweight"
              }
            }));
          }
          if(comp >= 15 && comp <=16){
            this.setState(prevState => ({
              currentStudent: {
                ...prevState.currentStudent,
                BMIVal: "Severely underweight"
              }
            }));
          }
          if(comp > 16 && comp <= 18.5){
            this.setState(prevState => ({
              currentStudent: {
                ...prevState.currentStudent,
                BMIVal: "Underweight"
              }
            }));
          }
          if(comp > 18.5 && comp <= 25){
            this.setState(prevState => ({
              currentStudent: {
                ...prevState.currentStudent,
                BMIVal: "Normal"
              }
            }));
          }
          if(comp > 25 && comp <= 30){
            this.setState(prevState => ({
              currentStudent: {
                ...prevState.currentStudent,
                BMIVal: "Overweight"
              }
            }));
          }
          if(comp > 30 && comp <= 35){
            this.setState(prevState => ({
              currentStudent: {
                ...prevState.currentStudent,
                BMIVal: "Moderately Overweight"
              }
            }));
          }
          if(comp > 35 && comp <= 40){
            this.setState(prevState => ({
              currentStudent: {
                ...prevState.currentStudent,
                BMIVal: "Severely Overweight"
              }
            }));
          }
          if(comp > 40){
            this.setState(prevState => ({
              currentStudent: {
                ...prevState.currentStudent,
                BMIVal: "Very severely obese"
              }
            }));
          }
      }
    }

  render() {
    const { currentStudent } = this.state;

    return (
      <div>
        {currentStudent ? (
          <div className="edit-form">
            <h4>Student BMI</h4>
            <form>
              <div className="form-group">
                <label htmlFor="studentID">Student ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="studentID"
                  value={currentStudent.studentID}
                  onChange={this.onChangeStudentID}
                />
              </div>
              <div className="form-group">
                <label htmlFor="studentName">Student Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="studentName"
                  value={currentStudent.studentName}
                  onChange={this.onChangeStudentName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight</label>
                <input
                  type="text"
                  className="form-control"
                  id="weight"
                  value={currentStudent.weight}
                  onChange={this.onChangeWeight}
                />
              </div>
              <div className="form-group">
                <label htmlFor="height">Height</label>
                <input
                  type="text"
                  className="form-control"
                  id="height"
                  value={currentStudent.height}
                  onChange={this.onChangeHeight}
                />
              </div>

              <div className="form-group">
                <label htmlFor="BMI">BMI</label>
                <input
                  type="text"
                  className="form-control"
                  id="BMI"
                  value={currentStudent.BMIVal}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              id="deleteBtn"
              onClick={this.deleteStudent}
            >
              Delete
            </button>

            <button
              type="submit"
              id="updateBtn"
              className="badge badge-success"
              onClick={this.updateStudent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Student...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(StudentBMI);