// export class APIfeature {
//   constructor(query, queryStr) {
//     this.query = query; //this one is mongoose query where we get find(),sort() ,limit() and more
//     this.queryStr = queryStr; //this one is express query string when we called the api
//   }

//   filter() {
//     const queryObject = { ...this.queryStr };
//     const excludedFields = ['page', 'sort', 'limit', 'fields'];

//     excludedFields.forEach((el) => delete queryObject[el]);

//     let queryStr = JSON.stringify(queryObject);
//     (queryStr);
//     queryStr = queryStr.replace(
//       /\b(gte|gte|lte|lt)\b/g,
//       (match) => `$${match}`,
//     );
//     this.query = this.query.find(JSON.parse(queryStr));
//     return this; //this will return the whole object so that the other method can access it
//   }

//   sort() {
//     if (this.queryStr.sort) {
//       const sortBy = this.queryStr.sort.split(',').join(' ');
//       this.queryStr = this.query.sort(sortBy);
//     } else {
//       this.query = this.query.sort('-createAt');
//     }
//     return this; //this will return the whole object so that the other method can access it
//   }

//   limitFields() {
//     if (this.queryStr.fields) {
//       const fields = this.queryStr.fields.split(',').join(' ');
//       (fields);
//       this.query = this.query.select(fields);
//     } else {
//       this.query = this.query.select('-__v'); //this is used to remove something from response to user
//     }
//     return this;
//   }

//   pagination() {
//     const page = this.queryStr.page * 1 || 1;
//     const limit = this.queryStr.limit * 1 || 1;
//     const skip = (page - 1) * limit;
//     // ?page=2&limit=10 1-10 page 1 ,11-20 page2
//     this.query = this.query.skip(skip).limit(limit);
//     return this;
//   }
// }

function applyFieldSelection(query, fieldsQuery) {
  // (fieldsQuery);
  //this will take a string an remove the (,) by split and join back up to create a string because select only take strings
  if (fieldsQuery) {
    const fields = fieldsQuery.split(',').join(' ');
    // (fields, 'fields');
    return query.select(fields);
  }
  return query.select('-__v');
}

function applySorting(query, sortQuery) {
  // (sortQuery, 'sort');
  //sortQuery is the req.query.sort
  if (sortQuery) {
    const sortBy = sortQuery.split(',').join(' ');
    return query.sort(sortBy); //to get accending or descending use fieldname or -fieldname
  }
  return query.sort('-createAt');
}
function applyPagination(query, pageQuery, limitQuery) {
  const page = pageQuery * 1 || 1;
  const limit = limitQuery * 1 || 10;
  const skip = (page - 1) * limit; //this used to get the previous page to skip
  return query.skip(skip).limit(limit);
}

export async function APIfeature(query, req) {
  //query is the model object
  // (query);
  const queryObject = { ...req.query };

  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObject[el]); //this will remove excludedFields from the query object

  let queryStr = JSON.stringify(queryObject);
  //  (queryStr, 'queryStr');
  queryStr = queryStr.replace(/\b(gte|gte|lte|lt)\b/g, (match) => `$${match}`);
  //  (queryStr, 'queryStrReplaced');
  query = query.find(JSON.parse(queryStr)); //! moongose query middleware triggered here because of find method

  query = applyFieldSelection(query, req.query.fields);
  query = applySorting(query, req.query.sort);
  query = applyPagination(query, req.query.page, req.query.limit);
  //return query.setOptions({ explain: 'executionStats' }); //remove this setOptions it just for statistics
  // const explainedQuery = await query.explain('executionStats');

  return query;
}
