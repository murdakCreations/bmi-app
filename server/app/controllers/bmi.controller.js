const db = require("../models");
const BMI = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new BMI
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
        return;
    }

    // Create Student BMI
    const bmiData = {
        studentID: req.body.studentID,
        studentName: req.body.studentName,
        weight: req.body.weight,
        height: req.body.height
    }

    // Save BMI in the database
    BMI.create(bmiData)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the Student BMI"
            })
        });
};