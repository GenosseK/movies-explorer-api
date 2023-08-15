const {
  PORT = 3000,
  MONGO_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

const SECRET_KEY = 'secret-key';

const MONGODB_CONFLICT_CODE = 11000;
const CREATED_CODE = 201;
const SUCCESS_CODE = 200;

const conflictErrorMessage = {
  createUser: 'Пользователь с таким email уже существует',
};

const notFoundErrorMessage = {
  notFoundUser: 'Пользователь не найдет',
  notFoundMovie: 'Фильм не найден',
  notFoundPage: 'Такой страницы нет :(',
};

const badRequestErrorMessage = {
  createUser: 'Переданные данные некорректны',
  updateUser: 'Переданные данные некорректны',
  createMovie: 'Переданные данные некорректны',
};

const forbiddenErrorMessage = {
  deleteMovie: 'Недостаточно прав для удаления фильма',
};

const unauthorizedErrorMessage = {
  login: 'Неправильные почта или пароль',
  auth: 'Необходима авторизация',
};

module.exports = {
  PORT,
  MONGO_DB,
  MONGODB_CONFLICT_CODE,
  CREATED_CODE,
  SUCCESS_CODE,
  conflictErrorMessage,
  notFoundErrorMessage,
  badRequestErrorMessage,
  forbiddenErrorMessage,
  unauthorizedErrorMessage,
  SECRET_KEY,
};
