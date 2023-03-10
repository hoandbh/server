const express = require('express');
const versionRouter = express.Router();
const versionController = require('../controllers/versionController');

versionRouter.route('/')
.get(versionController.getAllVersions)
.post(versionController.createVersions);

versionRouter.route('/questionnaire/:id')
.get(versionController.getVersionsByQuestionnaire);

versionRouter.route('/:id')
.get(versionController.getVersionById)
.delete(versionController.deleteVersion);

module.exports = versionRouter;
