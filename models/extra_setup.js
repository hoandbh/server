const { sequelize } = require("./sequelize");

const applyExtraSetup = () => {

<<<<<<< HEAD
    const {course, message, qst_in_questionnaire, ans_in_version, possible_answer,
           qst_in_version,questionnaire,score, test, user, version} = sequelize.models;
=======
    const {courses, messages, qst_in_questionnaires, ans_in_versions, possible_answers,
         qst_in_versions,questionnaire,scores, test, users, versions} = sequelize.models;
>>>>>>> 19a8adcf22d2ecdeec9ba5535bca418dce6b5ed9
        //  book.belongsTo(category, { foreignKey: "cateogry_id", as: "category" });
        //  book.belongsTo(author, { foreignKey: "author_id", as: "author" });
        //  author.hasMany(book, { foreignKey: "author_id", as: "books" });
        //  category.hasMany(book, { foreignKey: "cateogry_id", as: "books" });
//         Tutorial.hasMany(Comment, { as: "comments" });
        // Comment.belongsTo(Tutorial, {
        //   foreignKey: "tutorialId",
        //   as: "tutorial",
        // });
        // message.belongsTo(user)
        // user.hasMany(message)
         
<<<<<<< HEAD
        // qst_in_questionnaire.belongsTo(questionnaire, {foreignKey: "questionnaire", as: "questionnaire"});
        // questionnaire.hasMany(qst_in_questionnaire,{foreignKey:"questionnaire", as: "questions"});


        // possible_answer.belongsTo(qst_in_questionnaire,{foreignKey:"qst", as: "question"});
        // qst_in_questionnaire.hasMany(possible_answer,{foreignKey:"qst", as: "answers" });
=======
       qst_in_questionnaires.belongsTo(questionnaire, {foreignKey: "questionnaire", as: "questionnaire_id"});
       questionnaire.hasMany(qst_in_questionnaires,{foreignKey:"questionnaire", as: "questions"});


        possible_answers.belongsTo(qst_in_questionnaires,{foreignKey:"qst", as: "question"});
        qst_in_questionnaires.hasMany(possible_answers,{foreignKey:"qst", as: "answers" });
>>>>>>> 19a8adcf22d2ecdeec9ba5535bca418dce6b5ed9

        


}

module.exports = { applyExtraSetup };

