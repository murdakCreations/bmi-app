const db = require("../models")
const StudentBmis = db.studentBmis
const Op = db.Sequelize.Op

// Create and Save a new StudentBmis
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
        return
    }

    // Create a bmiData
    const bmiData = {
        studentID: req.body.studentID,
        studentName: req.body.studentName,
        weight: req.body.weight,
        height: req.body.height,
        BMIVal: req.body.BMIVal
    }

    // Save bmiData in the database
    StudentBmis.create(bmiData)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occured while creating the StudentBmis."
            })
        })
}

// Retrieve all StudentBmis from database
exports.findAll = (req, res) => {
    const title = req.query.title
    var condition = title ? { title: { [Op.like]: `%${title}`}} : null

    StudentBmis.findAll({where: condition})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occured while retrieving StudentBmiss."
            })
        })
}
