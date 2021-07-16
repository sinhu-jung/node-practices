const express = require('express');
const controller = require('../controllers/gallery');

const router = express.Router();
router.route('').get(controller.index);
// router.route('update').post(controller.add);
// router.route("/delete/:no").get(controller.delete);

module.exports = router;