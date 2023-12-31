const { ValidationError } = require('mongoose').Error;
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');
const Movie = require('../models/movie');
const {
  badRequestErrorMessage,
  CREATED_CODE,
  SUCCESS_CODE,
  notFoundErrorMessage,
  forbiddenErrorMessage,
} = require('../utils/constants');

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
      res.status(CREATED_CODE).send(movie);
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequestError(badRequestErrorMessage.createMovie));
      } else {
        next(error);
      }
    });
};

const getSavedMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner', '_id'])
    .then((movies) => {
      res.status(SUCCESS_CODE).send(movies);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.user;

  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(notFoundErrorMessage.notFoundMovie);
      }

      if (movie.owner.toString() !== _id) {
        throw new ForbiddenError(forbiddenErrorMessage.deleteMovie);
      }

      return movie.deleteOne();
    })
    .then(() => {
      res.status(SUCCESS_CODE).send({ message: 'Фильм удалён' });
    })
    .catch(next);
};

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovie,
};
