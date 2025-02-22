const express = require('express');
const router = express.Router();

const {
  getColors
} = require('../controllers/colorController');

router.get('/',getColors );

module.exports = router;