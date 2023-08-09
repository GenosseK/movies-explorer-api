const router = require('express').Router();
const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getSavedMovies);
router.post('/', createMovie);
router.delete('/:_id', deleteMovie);

module.exports = router;
