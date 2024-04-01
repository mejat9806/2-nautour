import mongoose from 'mongoose';

const tourScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must have a name'],
    unique: true,
    trim: true,
  },
  price: { type: Number, required: [true, 'must have price'] },
  priceDiscount: { type: Number },
  duration: { type: Number, required: [true, 'must have duration'] },
  maxGroupSize: {
    type: Number,
    required: [true, 'must have have group size '],
  },
  difficulty: { type: String, required: [true, 'must have difficulty'] },
  ratingsAverage: { type: Number, default: 0 },
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
});

const Tour = mongoose.model('Tour', tourScheme);
export default Tour;
//MVC arc
//! need to separete controller ,models and route to diferents file
