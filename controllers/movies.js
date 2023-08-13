const { ValidationError } = require('mongoose').Error;
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const Movie = require('../models/movie');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
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
  const { _id } = req.user;
  const movieId = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }

      if (movie.owner.toString() !== _id) {
        throw new ForbiddenError('Недостаточно прав для удаления фильма');
      }

      return movie.deleteOne();
    })
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
