const router = require('express').Router();
const {
  getAllThought,
  addThought,
  getThoughtById,
  updateThought,
  removeThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');


router
  .route('/')
  .get(getAllThought)
  .post(addThought);

router.route('/thoughts').post(addThought);


router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

router
   .route('/:id/reactions')
   .post(addReaction)
   .delete(removeReaction);

 router.route('/:id/reactions/:reactionId').delete(removeReaction);

module.exports = router;
