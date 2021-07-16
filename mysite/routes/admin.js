const express = require('express');
const controller = require('../controllers/admin');

const router = express.Router();
router.route('').get(controller.main);
router.route('/update').post(controller.update);

module.exports = router;