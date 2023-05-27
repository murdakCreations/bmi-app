const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const StudentBmi = sequelize.define("studentBMI", {
        studentID: {
            type: Sequelize.INTEGER
        },
        studentName: {
            type: Sequelize.STRING
        },
        weight: {
            type: Sequelize.FLOAT
        },
        height: {
            type: Sequelize.FLOAT
        },
        BMIVal: {
            type: Sequelize.STRING
        }
    })

    return StudentBmi
}