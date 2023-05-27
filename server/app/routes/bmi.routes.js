module.exports = app =>  {
    const studentBMI = require("../controllers/bmi.controller.js")

    var router = require("express").Router()

    // Create a new Student Data
    router.post("/", studentBMI.create)

    // Retrieve all studentBMI
    router.get("/", studentBMI.findAll)

    // Retrieve a single Student Data with id
    router.get("/:studentID", studentBMI.findOne)


    app.use('/api/studentBMI', router)
}