module.exports = (sequelize, Sequelize) => {
    const BMI = sequelize.define("bmi", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return BMI;
  };