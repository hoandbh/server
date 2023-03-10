const partDal = require('../dal/partDal');
const PartDal = require('../dal/partDal')

class PartController {

    getAllParts = async (req, res) => {
        const parts = await PartDal.getAllParts();
        if (!parts?.length)
            return res.status(400).json({ message: 'no parts found' })
        res.json(parts)
    }

    getPartById = async(req,res) => {
        const id = req.params.id;
        const part = await PartDal.getPartById(id);
        if(part)
            res.json(part)
        else
            res.status(204).send();
    }

    getAllPartsForQuestionnaire = async(req,res) => {
        const questionnaireId = req.params.questionnaireId;
        const parts = await PartDal.getAllPartsForQuestionnaire(questionnaireId);
        if(parts)
            res.json(parts);
        else
            res.status(204).send();
    }

    createPartForQuestionnaire = async(req,res) => {
        //to get the part number form the user????
        const questionnaireId = req.params.questionnaireId;
        const {serial_number, headline, mix} = req.body;
        if ((!serial_number && serial_number!=0) || (!headline && typeof(headline)!='string') || (!mix && mix!=false))//mix is boolean!!!
            return res.status(400).json({ message: 'All fields are required' });
        const part = await partDal.createNewPart({serial_number, headline, mix, questionnaire: questionnaireId});
        if (part)
            return res.status(201).json(part);
        return res.status(500).json({ message: 'Failed to create new message' });
    }
    
}
const partController = new PartController();
module.exports = partController;
