const { sequelize } = require("./sequelize");

const applyExtraSetup = () => {

  const {versions, courses, messages, qst_in_questionnaires, ans_in_versions, possible_answers,
       qst_in_versions,questionnaire,scores, users, ans_selected_in_test,part_in_questionnaire,part_in_version} = sequelize.models;
          
    //למשתמש יש שאלונים
    users.hasMany(questionnaire,{foreignKey:"owner", onDelete:'cascade'})
    questionnaire.belongsTo(users,{foreignKey:"owner", onDelete:'cascade'});

    //לקורס יש שאלונים
    courses.hasMany(questionnaire,{foreignKey:"course_id", onDelete:'cascade'});
    questionnaire.belongsTo(courses,{foreignKey:"course_id", onDelete:'cascade'});
   
    //בשאלון יש כמה חלקים
    questionnaire.hasMany(part_in_questionnaire,{foreignKey:"questionnaire_id", as:'parts', onDelete:'cascade'} );
    part_in_questionnaire.belongsTo(questionnaire, {foreignKey:"questionnaire_id", onDelete:'cascade'});

    //בחלק יש כמה שאלות 
    part_in_questionnaire.hasMany(qst_in_questionnaires,{foreignKey:"part_id", as:'questions', onDelete:'cascade'});
    qst_in_questionnaires.belongsTo(part_in_questionnaire, {foreignKey: "part_id", onDelete:'cascade'});

    //לשאלה יש כמה תשובות
    qst_in_questionnaires.hasMany(possible_answers,{foreignKey:"question_id" , as:'answers', onDelete:'cascade'});
    possible_answers.belongsTo(qst_in_questionnaires,{foreignKey:"question_id", onDelete:'cascade'});

    //לשאלון יש כמה גרסאות
    questionnaire.hasMany(versions, {foreignKey:"questionnaire_id", onDelete:'cascade'});
    versions.belongsTo(questionnaire, {foreignKey:"questionnaire_id",as: 'original_questionnaire', onDelete:'cascade'});

    //לגרסה יש כמה חלקים_בגרסה
    versions.hasMany(part_in_version,{foreignKey:"version_id", as:'parts', onDelete:'cascade'} );
    part_in_version.belongsTo(versions, {foreignKey:"version_id", onDelete:'cascade'});

    //לחלק_בגרסה יש כמה שאלות_בגרסה
    part_in_version.hasMany(qst_in_versions,{foreignKey:"part_id", as:'questions', onDelete:'cascade'});
    qst_in_versions.belongsTo(part_in_version, {foreignKey: "part_id", onDelete:'cascade'});

    //לשאלה_בגרסה יש כמה תשובות_בגרסה
    qst_in_versions.hasMany(ans_in_versions,{foreignKey:"question_id", as:'answers', onDelete:'cascade'});
    ans_in_versions.belongsTo(qst_in_versions, {foreignKey:"question_id", onDelete:'cascade'});

    //חלק_בגרסה שייך לחלק מקורי
    part_in_version.belongsTo(part_in_questionnaire, {foreignKey:"part_id", as:'original_part', onDelete:'cascade'});
    part_in_questionnaire.hasMany(part_in_version,{foreignKey:"part_id", onDelete:'cascade'} );
    
    //שאלה_בגרסה שייכת לשאלה מקורית
    qst_in_versions.belongsTo(qst_in_questionnaires,{foreignKey:"question_id", as:'original_question', onDelete:'cascade'});
    qst_in_questionnaires.hasMany(qst_in_versions,{foreignKey:"question_id", onDelete:'cascade'});

    //תשובה_בגרסה שייכת לתשובה מקורית
    ans_in_versions.belongsTo(possible_answers, {foreignKey:"answer_id", as:'original_answer', onDelete:'cascade'});
    possible_answers.hasMany(ans_in_versions,{foreignKey:"answer_id", onDelete:'cascade'});


    //קשור לציונים
    scores.belongsTo(questionnaire, {foreignKey:"questionnaire_id", onDelete:'cascade'});
    questionnaire.hasMany(scores, {foreignKey:"questionnaire_id", onDelete:'cascade'});

    messages.belongsTo(users, {foreignKey:"from", onDelete:'cascade'});
    users.hasMany(messages, {foreignKey:"from", onDelete:'cascade'});

    messages.belongsTo(users, {foreignKey:"to", onDelete:'cascade'});
    users.hasMany(messages, {foreignKey:"to", onDelete:'cascade'});

    ans_selected_in_test.belongsTo(qst_in_questionnaires, {foreignKey:"question_id", onDelete:'cascade'});
    qst_in_questionnaires.hasMany(ans_selected_in_test, {foreignKey:"question_id", onDelete:'cascade'});

    ans_selected_in_test.belongsTo(possible_answers, {foreignKey:"answer_id", onDelete:'cascade'});
    possible_answers.hasMany(ans_selected_in_test, {foreignKey:"answer_id", onDelete: 'cascade'}) 

}       
   
module.exports = { applyExtraSetup };

