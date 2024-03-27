//! for all of the router
import express from 'express';
import {
  CheckBody,
  checkId,
  deleteTour,
  getAllTours,
  getTour,
  patchTour,
  postTour,
} from '../controller/tourController.js';
export const router = express.Router(); //this uses to create router

//!Param middleware
//? middleware that only run for certain parameters
router.param('id', (req, res, next, val) => {
  next();
}); //this means this middleware will only run when id is detected
//this only run on this route  not in any other route with id
router.param('id', checkId);

// !
router.route('/').get(getAllTours).post(CheckBody, postTour);
router
  .route('/:id')
  // .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(patchTour)
  .delete(deleteTour); //use this method is it has the same url

//!
// .post(CheckBody, postTour); this part is like chainings 2 middleware together
