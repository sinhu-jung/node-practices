const express = require('express');
const controller = require('../controllers/admin');

const router = express.Router();
router.route('').get(controller.main);
router.route('/guestbook').get(controller.guestbook);
router.route('/board').get(controller.board);
router.route('/user').get(controller.user);
router.route('/update').post(controller.update);

module.exports = router;