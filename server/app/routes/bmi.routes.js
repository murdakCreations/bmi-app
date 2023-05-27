module.exports = app =>  {
    const studentBMI = require("../controllers/bmi.controller.js")

    var router = require("express").Router()

    // Create a new Student Data
    router.post("/", studentBMI.create)

    // Retrieve all studentBMI
    router.get("/", studentBMI.findAll)

    // Retrieve a single Student Data with id
    router.get("/:studentID", studentBMI.findOne)

    // Update a Student with id
    router.put("/:studentID", studentBMI.update)

    // Delete a Student with id
    router.delete("/:studentID", studentBMI.delete)

    app.use('/api/studentBMI', router)
}