import mongoose from 'mongoose';
import Tour from './tourModel.js';

const reviewScheme = new mongoose.Schema(
  {
    review: {
      type: String,
      maxLength: [1000, 'must not longer than a 1000 words'],
      required: [true, 'review must not be empty'],
    },
    rating: { type: Number, require: true, max: 5, min: 0 },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, //this will excluded from the response maybe for secrurity reasons
    },
    user: {
      //this is parrent referencing
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },

    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
  },
  {
    //this to make sure the virtual properties show up when query
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);
reviewScheme.index({ tour: 1, user: 1 }, { unique: true }); //this will make sure the combination of tour and user is unique to prevent user to submit multiple review for a tour//if this index not working delete the all dupilcated data and try again
reviewScheme.pre(/^find/, function (next) {
  this.populate({
    //this will find the name and photo and put it in the user area
    path: 'user',
    select: 'name photo',
  });
  // this.populate({//! remove tour because it will give us the tour again // it is unecessary here
  //   path: 'tour',
  //   select: 'name',
  // }).populate({
  //   path: 'user',
  //   select: 'name photo',
  // });
  next();
});

//!virtual populate we can poplutate the tour data with review without keeping the array of id on the tour model (it wont persistance)

// POST /tour/id/review this is nested route
// GET  /tour/id/review this is nested route
// GET  /tour/id/review/reviewID this is nested route

//!

//! calculate average rating and show it on the tour model
reviewScheme.statics.calcAverageRating = async function (tourId) {
  //Statics are pretty much the same as methods but allow for defining functions that exist directly on  Model.use static here because we want the access to the model and access the aggregate dunction
  const stats = await this.aggregate([
    //this keyword will refer to the current model
    {
      $match: { tour: tourId }, //this will select the tour we want to calculate
    },
    {
      $group: {
        _id: '$tour', //this will group the data by the tour
        nRating: { $sum: 1 }, //this will update every time we found that matched
        avgRating: { $avg: '$rating' }, //this will calculate the all of the rating and average it then put it into the avgRating
      },
    },
  ]);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      //this will update tour and presistent it
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsAverage: 0,
      ratingsQuantity: 4.5,
    });
  }
};

reviewScheme.post('save', function () {
  //this point current review
  this.constructor.calcAverageRating(this.tour); //this.constructor will point to the current review model without before moongose.model //this use to run the function
}); //this.tour refer to the tour in the Review output look at postMan

// reviewScheme.pre(/^findOneAnd/, async function (next) {
//   this.r = await this.clone().findOne(); //this will get the review we want and save it to this.r .this.r basically means it will create new fields in the model object and make it availaible to post middleware.r basically become the current model
//   next();
// });

// reviewScheme.post(/^findOneAnd/, async function () {
//   //await this.findOne(); does not work here , query already executed
//   await this.r.constructor.calcAverageRating(this.r.tour); //this.r.constructor.calAverageRating mean we will get the constructor from the current this.r (this.r refer to the current document ) and use it to calculate the rating .
// });
//!this is used to calculate the rating after updating the review/object above is the old way
reviewScheme.post(/^findOneAnd/, async function (doc) {
  await this.model.calcAverageRating(doc.tour);
});

export const Review = mongoose.model('Review', reviewScheme);
