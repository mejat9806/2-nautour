//! for all of the handlers

import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

///!this is module way to use __dirname
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
export const __dirname = path.dirname(__filename); // get the name of the directory
console.log(__dirname);
//! get data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

//!middleware
export const checkId = (req, res, next, val) => {
  console.log(`tour id is ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }
  next(); //val only for varams
};
export const CheckBody = (req, res, next) => {
  if (!req.body.price || !req.body.name) {
    return res.status(404).json({
      status: 'bad request',
      message: 'missing name or price',
    });
  }
  next();
};
//!
//!Route handlers
//! GET routes
export function getAllTours(req, res) {
  res.status(200).json({
    status: 'success',
    time: req.requestTime,
    result: tours.length,
    data: {
      tours: tours,
    },
  });
}

export function getTour(req, res) {
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
}
export function postTour(req, res) {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1; //the new id by using the old array id +1 //length - 1 is to get the last index of an array because length is
  const newTour = Object.assign({ id: newId }, req.body); //create newTour object by combining the newID and req.body form post
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours), //JSON.stringify is to make it readable on server or convert to json string
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
}
export function patchTour(req, res) {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here....>',
    },
  });
}
export function deleteTour(req, res) {
  res.status(204).json({
    status: 'success delete',
    data: null,
  });
}

//!what in here is the handler
