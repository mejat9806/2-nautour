/* eslint-disable prefer-object-spread */
//! for all of the handlers

// import { fileURLToPath } from 'url';
// import path from 'path';
// import fs from 'fs';
import Tour from '../model/tourModel.js';

///!this is module way to use __dirname
// const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
// export const __dirname = path.dirname(__filename); // get the name of the directory
// console.log(__dirname);
// //! get data
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

//!middleware
// export const checkId = (req, res, next, val) => {
//   console.log(`tour id is ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid id',
//     });
//   }
//   next(); //val only for varams
// };
// export const CheckBody = (req, res, next) => {
//   if (!req.body.price || !req.body.name) {
//     return res.status(404).json({
//       status: 'bad request',
//       message: 'missing name or price',
//     });
//   }
//   next();
// };
//!
//!Route handlers
//! GET routes
//!Aliasing this for most popular routes
export function aliasTopTour(req, res, next) {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  //all all this will be place on the qeury string as a default when we go to /top-5-cheap
  next();
}
//!
export async function getAllTours(req, res) {
  try {
    //!1a filtering
    console.log(req.query); //this how to show query string
    const queryObject = { ...req.query }; //this will make hard copy of queryObject
    const excludedFields = ['page', 'sort', 'limit', 'fields']; //item when to remove from queryObject because we use this for filtering

    excludedFields.forEach((el) => delete queryObject[el]); //this will delete the excludingFiled form queryobject

    //!1.a)advanced filtering
    //! advanced filtering gte,gr,lte,lt
    let queryStr = JSON.stringify(queryObject);

    queryStr = queryStr.replace(
      /\b(gte|gte|lte|lt)\b/g, //this will replace the gte to $gte forexample
      (match) => `$${match}`,
    );
    let query = Tour.find(
      //this will build the query first before send to the user as response //first way to write query for mongoose//we use let here instead of const because we want to update the query with more info
      JSON.parse(queryStr),
    );
    //!2)sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' '); //this is if we want to add more arguments for sorting if the the first one is the same //!it must in shape like this { sort: '-price,ratingsAverage' }//this because moongose require string with spaces
      console.log(sortBy);
      query = query.sort(sortBy); //if we want to sort in descending order we use - on the query like this http://127.0.0.1:3000/api/v1/tours?sort=-price
      // query = query.sort(req.query.sort); //if we want to sort in descending order we use - on the query like this http://127.0.0.1:3000/api/v1/tours?sort=-price
    } else {
      query = query.sort('-createAt'); // this will run if there is no sort basically the default
    }
    //!3)field limiting(projecting)
    //this allows user to limit what they want
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      console.log(fields);
      query = query.select(fields);
    } else {
      query = query.select('-__v'); //this is used to remove something from response to user
    }

    //!
    //!4)pagination
    const page = req.query.page * 1 || 1; //this is used to convert the query string into a number
    const limit = req.query.limit * 1 || 1; //static number can be used for limit
    const skip = (page - 1) * limit; //this means it the current page minus 1 to get the previous page to skip and multiply by the limit //example this will skip 20 when it is page 3
    // ?page=2&limit=10 1-10 page 1 ,11-20 page2
    query = query.skip(skip).limit(limit); //limit is how many result per request and skip ammount that should be skip before querying data

    if (req.query.page) {
      const numTour = await Tour.countDocuments(); //this is use to get the number of documents/item in DB
      if (skip >= numTour) throw new Error('this page did not exist');
    }
    //!

    //!this will execute the query
    const amountOfDoc = await Tour.countDocuments();
    const allTours = await query;
    //!send response
    res.status(200).json({
      status: 'success',
      amountOfDoc,
      result: allTours.length,
      data: {
        allTours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }
}

// const query  Tour.find() //other way to write query for mongoose
//   .where('duration')
//   .equals(req.query.duration)
//   .where('difficulty')
//   .equals(req.query.difficulty);
export async function getTour(req, res) {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'error',
      message: error.message,
    });
  }
}
export async function postTour(req, res) {
  // const newTour = new Tour({});
  // newTour.save();
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success full',
      data: {
        //tour: newTour,
        newTour,
      },
    });
  } catch (error) {
    //when error happens we send back this message.the error happen is the req.body fail to complying to the Tour model
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
}
export async function patchTour(req, res) {
  try {
    const editedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        editedTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
}
export async function deleteTour(req, res) {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({});
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
}

//!what in here is the handler
