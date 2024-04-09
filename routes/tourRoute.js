//! for all of the router
// this route will manage all the routes that user request for the tour only

//?all middlewares here are for tour router
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
import { protect } from '../controller/authController.js';

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
router.param('id', (req, res, next, val) => {
  req.forID = 'this add id ';
  next();
}); //this means this middleware will only run when id is detected
//this only run on this route  not in any other route with id
//router.param('id', checkId);

// !
router.route('/').get(protect, getAllTours).post(postTour); //protect route will run first
// router.route('/').get(getAllTours).post(CheckBody, postTour);
router
  .route('/:id')
  // .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(patchTour)
  .delete(deleteTour); //use this method is it has the same url

//!
// .post(CheckBody, postTour); this part is like chainings 2 middleware together
