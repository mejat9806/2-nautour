//! for all of the router
import express from 'express';
import {
  aliasTopTour,
  //CheckBody,
  // checkId,
  deleteTour,
  getAllTours,
  getTour,
  getTourstats,
  getmonthlyPlan,
  patchTour,
  postTour,
} from '../controller/tourController.js';

//?way to write route
//? router.route("the route").httpmethod(this can have multiple middleware)
export const router = express.Router(); //this uses to create router
//!Aliasing this for most popular routes
router.route('/tours-stats').get(getTourstats);
router.route('/monthly-plan/:year').get(getmonthlyPlan);
router.route('/top-5-cheap').get(aliasTopTour, getAllTours);
//!
//!Param middleware
// //? middleware that only run for certain parameters
// router.param('id', (req, res, next, val) => {
//   next();
// }); //this means this middleware will only run when id is detected
//this only run on this route  not in any other route with id
//router.param('id', checkId);

// !
router.route('/').get(getAllTours).post(postTour);
// router.route('/').get(getAllTours).post(CheckBody, postTour);
router
  .route('/:id')
  // .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(patchTour)
  .delete(deleteTour); //use this method is it has the same url

//!
// .post(CheckBody, postTour); this part is like chainings 2 middleware together
