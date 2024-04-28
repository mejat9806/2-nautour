import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import path from 'path';

const app = express();
///! middleware
app.use(express.json()); //use middleware here //app.use is use to use middleware
app.use(morgan('dev'));
app.use((req, res, next) => {
  // every middleware get req,res,next
  ('hello from middleware ');
  next(); //this is important becasue if there is no next it will stop here
}); //order is important if this middleware is place after the route it will not run because the request will stop the route

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); //;
  next();
});

/* app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello' });
});
app.post('/', (req, res) => {
  res.send('you can post to this endpoint ');
});
*/
//?
//? res is use to respond to the request
//? req is used to get the response we recieved form the client like the body ,param and url
//?
///!this is module way to use __dirname
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
__dirname;
//! get data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);
//!Route handlers
//! GET routes
function getAllTours(req, res) {
  res.status(200).json({
    status: 'success',
    time: req.requestTime,
    result: tours.length,
    data: {
      tours: tours,
    },
  });
}
// app.get('/api/v1/tours', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     result: tours.length,
//     data: {
//       tours: tours,
//     },
//   });
// });

//!get 1 tour
//!route with variable this GET with variable
//:param? example /:name? meaning that it is optional
function getTour(req, res) {
  const id = Number(req.params.id); //this is to conver param to number
  const tour = tours.find((el) => el.id === id); //this will return the tour that have element id equal to the param id
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
}
// app.get('/api/v1/tours/:id', (req, res) => {
//   const id = Number(req.params.id); //this is to conver param to number
//   const tour = tours.find((el) => el.id === id); //this will return the tour that have element id equal to the param id
//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid id',
//     }); //return because we want to function to stop here
//   }
//   // if (id > tours.length) {
//   //   return res.status(404).json({
//   //     status: 'fail',
//   //     message: 'Invalid id',
//   //   }); //return because we want to function to stop here
//   // }
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tours: tour,
//     },
//   });
// });

/* //!POST
                    need middleware above
                    */
function postTour(req, res) {
  const newId = tours[tours.length - 1].id + 1; //the new id by using the old array id +1 //length - 1 is to get the last index of an array because length is
  const newTour = Object.assign({ id: newId }, req.body); //create newTour object by combining the newID and req.body form post
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours), //JSON.stringify is to make it readable on server or convert to json string
    (err) => {
      res.status(200).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
}
// app.post('/api/v1/tours', (req, res) => {
//   const newId = tours[tours.length - 1].id + 1; //the new id by using the old array id +1 //length - 1 is to get the last index of an array because length is
//   const newTour = Object.assign({ id: newId }, req.body); //create newTour object by combining the newID and req.body form post
//   tours.push(newTour);
//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(tours), //JSON.stringify is to make it readable on server or convert to json string
//     (err) => {
//       res.status(200).json({
//         status: 'success',
//         data: {
//           tour: newTour,
//         },
//       });
//     }
//   );
// });

/* //!PATCH
 */
function patchTour(req, res) {
  req.body;
  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    }); //return because we want to function to stop here
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here....>',
    },
  });
}

/*   app.patch('/api/v1/tours/:id', (req, res) => {
  (req.body);
  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id',
    }); //return because we want to function to stop here
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here....>',
    },
  });
}); */
/* //!Delete
 */
function deleteTour(req, res) {
  req.body;
  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id to delete',
    }); //return because we want to function to stop here
  }
  res.status(204).json({
    status: 'success delete',
    data: null,
  });
}
/* app.delete('/api/v1/tours/:id', (req, res) => {
  (req.body);
  if (Number(req.params.id) > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id to delete',
    }); //return because we want to function to stop here
  }
  res.status(204).json({
    status: 'success delete',
    data: null,
  });
});
*/

//app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', postTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', patchTour);
// app.delete('/api/v1/tours/:id', deleteTour);
function getAlluser(req, res) {
  res.status(500).json({
    status: 'hello from user',
    message: 'this route is not define',
  });
}
function createUser(req, res) {
  res.status(500).json({
    status: 'hello from user',
    message: 'this route is not define',
  });
}
function getUser(req, res) {
  res.status(500).json({
    status: 'hello from user',
    message: 'this route is not define',
  });
}
function patchUser(req, res) {
  res.status(500).json({
    status: 'hello from user',
    message: 'this route is not define',
  });
}
function deleteUser(req, res) {
  res.status(500).json({
    status: 'hello from user',
    message: 'this route is not define',
  });
}

//!route
const tourRouter = express.Router(); //this uses to create router
const userRouter = express.Router(); //this is called mounting the router

tourRouter.route('/').get(getAllTours).post(postTour); //dont need to specify routes like /api/v1/tours because it already follows it because of the middleware ("/") meaning the root
// tourRouter.route('/api/v1/tours').get(getAllTours).post(postTour); //use this method is it has the same url

tourRouter
  .route('/:id')
  // .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(patchTour)
  .delete(deleteTour); //use this method is it has the same url

userRouter.route('/').get(getAlluser).post(createUser);
userRouter.route('/:id').get(getUser).patch(patchUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter); //this will use tourRouter as middleware to that route
app.use('/api/v1/users', userRouter);
//!start the server

const port = 3000;
app.listen(port, () => {
  'listen app on port ' + port;
});
