const express = require('express');
const messageRouter = express.Router();
const messageController = require('../controllers/messageController');
//.post(verifyJWT, messageController.createNewMessage);
//or
//router.use(verifyJWT)
const verifyJWT = require('../middleware/verifyJWT');

messageRouter.use(verifyJWT);

messageRouter.route('/')
    .get(messageController.getAllMessages)
    .post(messageController.createNewMessage);

messageRouter.route('/search')
    .get(messageController.search)


messageRouter.route('/:id')
    .get(messageController.getMessageById)
    .delete(messageController.deleteMessage)

module.exports = messageRouter;
