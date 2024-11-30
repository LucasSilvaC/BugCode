const express = require('express');

const router = express.Router();

const { UserMiddleSignUp, UserMiddleWareSignIn } = require('../middleware/user-middle-ware');
const { NewUserController, checkUserController } = require('../controller/user-controller');

router.post('/', UserMiddleSignUp, NewUserController);
router.post('/check', UserMiddleWareSignIn, checkUserController);

module.exports = router;