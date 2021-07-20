const express = require('express');
const authorized = require('./authorized');
const controller = require('../controllers/board');

const router = express.Router();
router.route('/:page').get(controller.list);
router.route('/write/write').get(authorized(''), controller.write);
router.route('/write').post(authorized(''), controller._write);
router.route('/delete/:userNo/:no').get(authorized(''), controller.delete);
router.route('/view/:no/:hit').get(controller.view);
router.route('/comment/:no').get(controller.comment);

module.exports = router;