/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
//!this M part of MVC
// this M part of MVC will handle data manupultion for tour only
import mongoose from 'mongoose';
import slugify from 'slugify';
import validator from 'validator';

const tourScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'must have a name'], //this is validator
      unique: true,
      trim: true,
      maxLength: [255, 'tour must not longer than 255 characters'], //this is validator
      minLength: [5, 'tour must longer than 10 characters'], //this is validator
      validate: {
        validator: function (val) {
          return validator.isAlpha(val, 'en-US', { ignore: ' ' });
        },
        message: 'Tours name must be characters not numeric',
      },
    },
    price: { type: Number, required: [true, 'must have price'] },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price; //100 < 200 //this can access the whole  current document //this only work on new documents //dont work on updates
        },
        message: `discount price ({VALUE}) must be lower than regular price`,
      },
    },
    duration: { type: Number, required: [true, 'must have duration'] },
    maxGroupSize: {
      type: Number,
      required: [true, 'must have have group size '],
    },
    difficulty: {
      type: String,
      required: [true, 'must have difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'difficulty must be easy,medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      min: [1, 'Rating must be above 1.0'], //this work for dates too
      max: [5, 'Rating must be below 5'], //this work for dates too
    },
    ratingsQuantity: { type: Number, default: 0 },
    summary: {
      type: String,
      trim: true,
      required: [true, 'must have difficulty'],
    }, //trime will remove whitespace from the beginning and end
    description: { type: String, trim: true },
    imageCover: { type: String, required: [true, 'must have cover image'] },
    images: [String],
    createAt: {
      type: Date,
      default: Date.now(),
      select: false, //this will excluded from the response maybe for secrurity reasons
    },
    startDates: [Date],
    secretTour: { type: Boolean, default: false },
    slug: String,
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);
//this keyword is allowed us to access the current document
//!virtual properties are field that we can defined but it will be not persistent/save in our DB
tourScheme.virtual('durationWeeks').get(function () {
  return this.duration / 7; //this here is the current process document
});

//!this is  document middleware :it runs before .save() and .create()
tourScheme.pre('save', function (next) {
  this.slug = slugify(`${this.name}-${this._id}`, { lower: true });
  next();
}); //this pre middleware will run before a event like save

//!query middleware :it runs before find() query //this will point at the current query
tourScheme.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } }); //this will hide the secret tour
  this.start = Date.now(); //this will add start time to every find querys
  this.hello = 'hello';

  next();
});
// tourScheme.pre('find', function (next) {
//   this.find({ secretTour: { $ne: true } });
//   next();
// });
tourScheme.post(/^find/, function (doc, next) {
  console.log(`query took ${Date.now() - this.start} milliseconds`);

  next();
});
//!
//!aggregation middleware
tourScheme.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } }); //this will add another match to filterout secret tour item
  // this.pipeline().shift({ $sort: { avgPrice: 1 } });
  // console.log(this.pipeline());
  next();
});
//!
//!mogoose data validation
//?sanitization of data and validation
//? validation is done to check if the field is filled and valid
//? sanitization are used to check if the input have malicious input or not  and filter it out
//!custom validator

//!the required in the schema is some kind of validation
//!
// tourScheme.pre('save', function (next) {
//   console.log('will save document');
//   next();
// });
// tourScheme.post('save', (doc, next) => {
//   console.log(doc);
//   next();
// });
const Tour = mongoose.model('Tour', tourScheme);
export default Tour; //this TOUR allows us to use mongoose operator like find
//MVC arc
//! need to separete controller ,models and route to diferents file //virtual cant be use in query

//!Mongoose MIDDLEWARE
//?they are 4 type of mongoose middleware document ,model,aggregate,query
