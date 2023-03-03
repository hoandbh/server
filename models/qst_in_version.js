const { sequelize, DataTypes } = require("./sequelize");
    const Qst_in_version= sequelize.define(
        "qst_in_versions",
        {
            id_qst: {
                type: DataTypes.INTEGER,
                //,allowNull:
                //autoIncrement: true,
                primaryKey: true
            },
            version: {
                type: DataTypes.INTEGER
                //,allowNull:
            },
            qst_in_questionnaire: {
                type: DataTypes.INTEGER
                //,allowNull:
            },
            serial_number: {
                type: DataTypes.INTEGER
                //,allowNull:
            }
        },
        {
            timestamps: false,
        }
    );
module.exports = Qst_in_version;
