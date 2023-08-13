const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/notFoundError');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { userInfoValidation, loginValidation } = require('../middlewares/validation');

router.post('/signup', userInfoValidation, createUser);
router.post('/signin', loginValidation, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Такой страницы нет :('));
});

module.exports = router;
