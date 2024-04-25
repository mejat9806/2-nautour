/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-console */
//!this M part of MVC
// this M part of MVC will handle data manupultion for tour only
import mongoose from 'mongoose';
import slugify from 'slugify';
import validator from 'validator';
//import { User } from './userModel.js';

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
      min: [0, 'Rating must be above 0'], //this work for dates too
      max: [5, 'Rating must be below 5'], //this work for dates too
      set: (val) => Math.round(val * 10) / 10, //this just to round the number //this will run each there is a value for rating average
    },
    ratingsQuantity: { type: Number, default: 0 },
    summary: {
      type: String,
      trim: true,
      required: [true, 'must have summary'],
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
    locations: [
      //GEOJSON location emmbeded document
      {
        type: { type: String, default: 'Point', enum: ['Point'] },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    startLocation: {
      //GEOJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    // guides: Array, //! this is for embeded .we will request the guide info using pre middleware and the id the function is at  @embeded
    guides: [{ type: mongoose.Schema.ObjectId, ref: 'User' }], //this is for referencing the guide  .the User is the User Model/schema //using this we will only see the guid id not the full object.this is child refrence
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

//!this is called singlefield index
//tourScheme.index({ price: 1 }); //-1 for decending //! index is use for to prevent mongoDB from scanning the whole collection for the data that matches the params becuase if we have many documents like millions it may harm the performance so we put the index on the most popular query/params
//!
//!compound index
// just need the compount because it will work with 1 field
tourScheme.index({ price: 1, ratingsAverage: -1 });
tourScheme.index({ slug: 1 });
tourScheme.index({ startLocation: '2dsphere' }); //this for geospatial
//?which field to index? just indexed the most used field like price and rating
//!
//this keyword is allowed us to access the current document
//!virtual properties are field that we can defined but it will be not persistent/save in our DB
tourScheme.virtual('durationWeeks').get(function () {
  return this.duration / 7; //this here is the current process document
});

//!virtual populate we can poplutate the tour data with review without keeping the array of id on the tour model (it wont persistance) //this only show up on fetch

tourScheme.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour', //this is the name from the Review model where the current refrences is store //yhis refere to the tour in the review
  localField: '_id', //this is what hold the refrence value
});
//!
//!this is  document middleware :it runs before .save() ,.create(),find or any other function
tourScheme.pre('save', function (next) {
  this.slug = slugify(`${this.name}-${this._id}`, { lower: true });
  next();
}); //this pre middleware will run before a event like save

//? this is for embeded document  @embeded
// tourScheme.pre('save', async function (next) {
//   //this will get all of the user data based on the id this mostly for embeded data
//   const guidesPromise = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromise);
//   next();
// });
//?
tourScheme.pre(/^find/, function (next) {
  //this always refer to current document .by doing this.populate it will fill the guides each time we run query.it work in all tours query methods
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});
//?
//!
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

//the post middleware runs after the specified operation is completed
tourScheme.post(/^find/, function (doc, next) {
  console.log(`query took ${Date.now() - this.start} milliseconds`);

  next();
});
//!
//!aggregation middleware
tourScheme.pre('aggregate', function (next) {
  this.pipeline().push({ $match: { secretTour: { $ne: true } } }); //this will add another match to filterout secret tour item
  // this.pipeline().shift({ $sort: { avgPrice: 1 } });
  console.log(this.pipeline());
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
