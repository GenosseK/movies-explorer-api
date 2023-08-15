const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ValidationError } = require('mongoose').Error;
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/unauthorizedError');
const ConflictError = require('../errors/conflictError');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const {
  MONGODB_CONFLICT_CODE,
  conflictErrorMessage,
  badRequestErrorMessage,
  unauthorizedErrorMessage,
  notFoundErrorMessage,
  SUCCESS_CODE,
  CREATED_CODE,
  SECRET_KEY,
} = require('../utils/constants');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      next(err);
      return;
    }

    User.create({
      name, email, password: hashedPassword,
    })
      .then((user) => {
        res.status(CREATED_CODE).send({
          name: user.name,
          email: user.email,
        });
      })
      .catch((error) => {
        if (error.code === MONGODB_CONFLICT_CODE) {
          next(new ConflictError(conflictErrorMessage.createUser));
        } else if (error instanceof ValidationError) {
          next(new BadRequestError(badRequestErrorMessage.createUser));
        } else {
          next(error);
        }
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => {
      throw new UnauthorizedError(unauthorizedErrorMessage.login);
    })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((validUser) => {
          if (validUser) {
            const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY, { expiresIn: '7d' });
            res.send({ token });
          } else {
            throw new UnauthorizedError(unauthorizedErrorMessage.login);
          }
        })
        .catch(next);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError(notFoundErrorMessage.notFoundUser);
    })
    .then((user) => {
      res.status(SUCCESS_CODE).send(user);
    })
    .catch((error) => {
      next(error);
    });
};

const updateUser = (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError(notFoundErrorMessage.notFoundUser);
    })
    .then((user) => {
      res.status(SUCCESS_CODE).send(user);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequestError(badRequestErrorMessage.updateUser));
      } else {
        next(error);
      }
    });
};

module.exports = {
  getUserInfo,
  updateUser,
  createUser,
  login,
};
