const express = require('express');
const router = express.Router();

const {
  registerAdminUser,
  loginAdminUser,
} = require('../controllers/AdminUserController');

router.post('/user', registerAdminUser);
router.get('/user', loginAdminUser);

module.exports = router;
