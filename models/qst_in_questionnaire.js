const { sequelize, DataTypes } = require("./sequelize");
const Qst_in_questionnaire = sequelize.define(
  "qst_in_questionnaires",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    part_id: {
      type: DataTypes.INTEGER
    },
    content: {
      type: DataTypes.STRING(1000)
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    serial_number_in_part: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false,
  }
);

module.exports = Qst_in_questionnaire;
