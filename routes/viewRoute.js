import express from 'express';
import { getOverView, getTourView } from '../controller/viewController.js';

export const router = express.Router();

//!pug routes//

router.get('/', getOverView);

router.get('/tours/:slug', getTourView);

//!router
