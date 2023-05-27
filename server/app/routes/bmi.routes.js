module.exports = app =>  {
    const studentBMI = require("../controllers/bmi.controller.js")

    var router = require("express").Router()

    // Create a new Student Data
    router.post("/", studentBMI.create)

    // Retrieve all studentBMI
    router.get("/", studentBMI.findAll)

    app.use('/api/studentBMI', router)
}