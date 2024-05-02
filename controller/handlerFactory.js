import { APIfeature } from '../utils/apiFeature.js';
import { AppError } from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';

export const getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //to allow for nested GET reviews on tour (hack)
    let filter = {};

    if (req.params.tourId) {
      //this will only run if we in nested routes
      filter = { tour: req.params.tourId }; //this wll update the filter with the tour id
    }

    //const amountOfDoc = await Model.countDocuments();

    const feature = await APIfeature(Model.find(filter), req);
    const doc = await feature;
    //!send response
    res.status(200).json({
      status: 'success',
      timeRequesteds: req.requestTimes,
      result: doc.length,
      data: {
        doc,
      },
    });
  });

export const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    // (doc);
    if (!doc) {
      const err = AppError('No document found with that id', 404);
      return next(err);
    }
    res.status(204).json({
      status: 'success',
      message: 'Document deleted successfully',
    });
  });

export const createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(200).json({
      status: 'success',
      message: 'Document created successfully',
      data: {
        data: newDoc,
      },
    });
  });

export const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.body.password) {
      return next(
        AppError('Password cant be update here please go to /updateMyPassword'),
      );
    }
    if (!req.params.id) {
      return next(AppError('No document found with that id'));
    }
    const updateDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidator: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        data: updateDoc,
      },
    });
  });

export const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) {
      query = query.populate(popOptions);
    }
    const doc = await query;
    // .populate({
    //   path: 'guides',
    //   select: '-__v -passwordChangedAt',
    // }); //this is for referencing data for the tour in a query(find)
    if (!doc) {
      const err = AppError('Tour not found', 404);
      return next(err);
    }
    res.status(200).json({
      status: 'success',
      timeRequesteds: req.requestTimes,
      data: {
        doc,
      },
    });
  });
