const router = require('express').Router();

const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');
const { userInfoValidation, updateUserInfoValidation } = require('../middlewares/validation');

router.get('/me', userInfoValidation, getUserInfo);
router.patch('/me', updateUserInfoValidation, updateUser);

module.exports = router;
