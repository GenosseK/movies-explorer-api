const router = require('express').Router();
const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieCreationValidation } = require('../middlewares/validation');

router.get('/', getSavedMovies);
router.post('/', movieCreationValidation, createMovie);
router.delete('/:_id', deleteMovie);

module.exports = router;
