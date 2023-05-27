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

// Find a single StudentBmis with an id
exports.findOne = (req, res) => {
    const id = req.params.studentID

    StudentBmis.findOne({where: {studentID: id}})
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(400).send({
                    message: `Cannot find StudentBmis with id=${id}`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving StudentBmis with id=" + id
            })
        })
}

// Update a StudentBmis by the id in the request
exports.update = (req, res) => {
    const id = req.params.studentID

    StudentBmis.update(req.body, {
        where: {studentID: id}
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "StudentBmis was updated successfully"
                })
            } else {
                res.send({
                    message: `Cannot update StudentBmis with id=${id}. Maybe StudentBmis was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating StudentBmis with id=" + id
            })
        })
}

// Delete a StudentBmis with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.studentID

    StudentBmis.destroy({
        where: {studentID: id}
    })
        .then(num => {
            if(num == 1) {
                res.send({
                    message: "StudentBmis was deleted successfully!"
                })
            } else {
                res.send({
                    message: `Cannot delete StudentBmis with id=${id}. Maybe StudentBmis was not found!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete StudentBmis with id=" + id
            })
        })
}

// Delete all StudentBmiss from the database
exports.deleteAll = (req, res) => {
    StudentBmis.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} StudentBmiss were deleted successfully`})
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while removing all StudentBmiss"
            })
        })
}