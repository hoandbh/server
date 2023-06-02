const testsService = require('../services/testsService');

class TestsController {
  convertAnsSelectedInTestToScore = async (req, res, next) => {
  const { studentId, questionnaireId } = req.body;
  // const { studentId, questionnaireId } = req.query;
  if (!studentId || !questionnaireId)
    return res.status(400).json({ message: 'All fields are required' });
  const ansSelctedOfThisStudent = await testsService.convertAnsSelectedInTestToScore({ studentId, questionnaireId });
  res.json(ansSelctedOfThisStudent);
  }

}
 
module.exports = new TestsController(); 