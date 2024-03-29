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
export async function getAllTours(req, res) {
  try {
    const allTours = await Tour.find();
    res.status(200).json({
      status: 'success',
      result: allTours.length,
      data: {
        allTours,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
}

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
