const router = require('express').Router();
const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { movieCreationValidation, movieIdValidation } = require('../middlewares/validation');

router.get('/', getSavedMovies);
router.post('/', movieCreationValidation, createMovie);
router.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = router;
