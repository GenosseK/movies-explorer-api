const { ValidationError } = require('mongoose').Error;
const BadRequestError = require('../errors/badRequestError');
const Movie = require('../models/movie');

const createMovie = (req, res, next) => {
  const movieData = { ...req.body, owner: req.user._id };

  Movie.create(movieData)
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequestError('Переданные данные некорректны'));
      } else {
        next(error);
      }
    });
};

const getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  Movie.findOneAndDelete({ _id: req.params._id, owner: req.user._id })
    .then(() => {
      res.status(200).send({ message: 'Фильм удалён' });
    })
    .catch(next);
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovie,
};
