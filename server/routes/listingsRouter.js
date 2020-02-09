/* This file is your server listingsRouter. 
   Trace the dependencies so you understand which files are connected and how data is passed between them
   For each route, make note of the sequence of requests called for each

*/

import * as listings from '../controllers/listingsController.js';
import getCoordinates from '../controllers/coordinatesController.js';
import express from 'express'; //refers to Express the middleware helper for Node.js
const listingsRouter = express.Router();
/* 
  These method calls are responsible for routing requests to the correct request handler.
  Take note that it is possible for different controller functions to handle requests to the same route.
  Note: the listings variable above and the file it is connected to help you trace
 */

 
const hello = (req, res, next)=>{ 
  console.log("Time:",new Date());
  next();
}


listingsRouter.get('/', listings.list);
listingsRouter.post('/', getCoordinates, listings.create);

/*
  The ':' specifies a URL parameter. 
 */
listingsRouter.get('/:listingId', listings.listingByID, listings.read);
listingsRouter.put('/:listingId', listings.listingByID, getCoordinates, listings.update);
listingsRouter.delete('/:listingId', listings.listingByID, listings.remove);

export default listingsRouter;
