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
  getDistance,
  getTour,
  getToursWithin,
  getTourstats,
  getmonthlyPlan,
  patchTour,
  postTour,
  resizeTourPhoto,
  uploadTourImage,
} from '../controller/tourController.js';
import { router as reviewRouter } from './reviewRoute.js';
import { protect, restrictTo } from '../controller/authController.js';
// import { creteaReview } from '../controller/reviewController.js';

//?way to write route
//? router.route("the route").httpmethod(this can have multiple middleware)

export const router = express.Router(); //this uses to create router
//!Aliasing this for most popular routes
router.route('/tours-stats').get(getTourstats);
router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getmonthlyPlan);
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

// ! geospatial stuff
//
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);
//example in url like this tours-distance/223/center/40,45/unit/km
//or like this tours-distance?distance=223&center=-40,45&unit=km

router.route('/distances/:latlng/unit/:unit').get(getDistance);
//!
router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide', 'user'), postTour); //protect route will run first
// router.route('/').get(getAllTours).post(CheckBody, postTour);
router
  .route('/:id')
  // .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(
    protect,
    restrictTo('admin', 'lead-guide'),
    uploadTourImage,
    resizeTourPhoto,
    patchTour,
  )
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour); //use this method is it has the same url

//!

//!nested routes
// POST /tour/id/review this is nested route
// GET  /tour/id/review this is nested route
// GET  /tour/id/review/reviewID this is nested route

// router
//   .route('/:tourId/reviews')
//   .post(protect, restrictTo('user'), creteaReview);
router.use('/:tourId/reviews', reviewRouter);
//this just mean if it tours/:tourId/reviews use reviewRouter

//!
// .post(CheckBody, postTour); this part is like chainings 2 middleware together

//restrictTo('admin'),
//
