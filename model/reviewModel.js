import mongoose from 'mongoose';

const reviewScheme = new mongoose.Schema(
  {
    review: {
      type: String,
      maxLength: [1000, 'must not longer than a 1000 words'],
      required: [true, 'review must not be empty'],
    },
    rating: { type: Number, require: true, max: 5, min: 1 },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, //this will excluded from the response maybe for secrurity reasons
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a tour'],
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

reviewScheme.pre(/^find/, function (next) {
  this.populate({
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
export const Review = mongoose.model('Review', reviewScheme);

// POST /tour/id/review this is nested route
// GET  /tour/id/review this is nested route
// GET  /tour/id/review/reviewID this is nested route
