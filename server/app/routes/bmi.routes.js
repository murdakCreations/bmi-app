module.exports = app => {
    const bmi = require("../controllers/bmi.controller.js");

    var router = require("express").Router()

    // Create new Student BMI
    router.post("/", bmi.create)
}