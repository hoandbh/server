const QuestionDal = require('../dal/qst_in_questionnaireDal');
const AnswerDal = require('../dal/answerDal');
const fsPromises = require('fs').promises;
const path = require('path');
const { v4: uuid } = require('uuid');

class QuestionController {


  getQstById = async (req, res) => {
    const { id } = req.params;
    const question = await QuestionDal.getQstById(id);
    if (!question) {
      return res.status(204).send();
    }
    res.json(question);
  }

  // uploadImage = async (req, res) => {
  //   const image = req.file;
  //   const { id } = req.params;
  //   if (!image) {
  //     return res.status(400).send("No image provided")
  //   }

  //   const folder = path.resolve(__dirname, "../public/images");
  //   const Imagename = `${uuid()}_${image.originalname}`
  //   const x = `${uuid()}_${image.originalname}`;
  //   const imageUrl = path.resolve(folder, x);

  //   try {
  //     await fsPromises.writeFile(imageUrl, image.buffer);
  //     await QuestionDal.addImagePath(id, x);
  //     // await QuestionDal.addImagePath(id, imageUrl);
  //     return res.json({ location: imageUrl, name: Imagename, name2:x })
  //   } catch (err) {
  //     return res.status(500).send("Invalid image data provided")
  //   }
  // }

  
  uploadImage = async (req, res) => {
    const image = req.file;
    const { id } = req.params;
    if (!image) {
      return res.status(400).send("No image provided")
    }

    const folder = path.join(__dirname, "..", "public", "images")  
    const imageName = `${uuid()}_${image.originalname}`
    const imageUrl  =`${folder}/${imageName}`

    try {
      await fsPromises.writeFile(imageUrl, image.buffer);
      await QuestionDal.addImagePath(id, imageName);
      return res.json({location: imageUrl, name:imageName })
    } catch (err) {
      return res.status(500).send("Invalid image data provided")
    }
  }


  getAllQstOfPart = async (req, res) => {
    const { partId } = req.params;
    const questions = await QuestionDal.getAllQstOfPart(partId);
    if (!questions?.length) {
      return res.status(204).send();
    }
    res.json(questions);
  }


  updateQst = async (req, res) => {
    const { id } = req.params;
    const { content, correctAnswerContent, incorrectAnswers } = req.body;
    const question = await QuestionDal.updateQst(id, content);
    if (!question) {
      return res.status(404).send('Question not found');
    }
    await AnswerDal.deleteAnswersOfQuestion(id);
    if (correctAnswerContent) {
      const correctAnswer = {
        content: correctAnswerContent,
        question_id: id,
        is_correct: true
      }
      const answer = await AnswerDal.createNewAns(correctAnswer);
    }
    if (incorrectAnswers) {
      incorrectAnswers.map(inCorrectAnswerContent => {
        AnswerDal.createNewAns({
          content: inCorrectAnswerContent,
          question_id: id,
          is_correct: false
        })
      });
    }
    return res.send(question);
  }

  createNewQst = async (req, res) => {
    const { content, part_id } = req.body;
    const qst = await QuestionDal.createNewQst({ content, part_id });
    if (qst)
      return res.status(201).json(qst)
  }

  deleteQst = async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'question ID required' });
    }
    await QuestionDal.deleteQst(id);
    await AnswerDal.deleteAnswersOfQuestion(id)
    res.json(`Message ID ${id} deleted`);
  }

}

const questionController = new QuestionController();
module.exports = questionController;

  // not in use
  // getAllQst = async (req, res) => {
  //   var questinos = await QuestionDal.getAllQst();
  //   if (!questinos?.length)
  //     return res.status(204).send();
  //   res.json(questinos);
  // }

  // not in use
  // getMessageById = async (req, res) => {
  //   const id = req.params.id;
  //   const question = await QstDal.getMessageById(id);
  //   if (question)
  //     res.json(question);
  //   else
  //     return res.status(204).send();
  // }

  // not in use
  // getAllQstOfPartWithOutAnswers = async (req, res) => {
  //   const {partId} = req.params;
  //   const questinos = await QuestionDal.getAllQstOfPart(partId);
  //   if (!questinos?.length)
  //     return res.status(204).send();
  //   res.json(questinos);
  // }