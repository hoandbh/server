const { sequelize, DataTypes } = require("./sequelize");
const Qst_in_version = sequelize.define(
  "qst_in_versions",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    // version_id: {
    //   type: DataTypes.INTEGER
    // },
    part_id: {
      type: DataTypes.INTEGER
    },
    question_id: {
      type: DataTypes.INTEGER
    },
    serial_number_in_part: {
      type: DataTypes.INTEGER
    }   
  },
  {
    timestamps: false,
  }
);
module.exports = Qst_in_version;
