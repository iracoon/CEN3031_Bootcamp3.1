/* Dependencies */
import mongoose from 'mongoose';
import Listing from '../models/ListingModel.js';
import coordinates from './coordinatesController.js';

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message. 
  On success (aka no error), you should send the listing(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions refer back to this tutorial 
  https://www.callicoder.com/node-js-express-mongodb-restful-crud-api-tutorial/
  or
  https://medium.com/@dinyangetoh/how-to-build-simple-restful-api-with-nodejs-expressjs-and-mongodb-99348012925d
  

  If you are looking for more understanding of exports and export modules - 
  https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
  or
  https://medium.com/@etherealm/named-export-vs-default-export-in-es6-affb483a0910
 */

/* Create a listing */
export const create = async (req, res) => {
    /* Instantiate a Listing */
    /* save the coordinates from the coordinatesController (located in req.results if there is an address property) */
    /* Then save the listing to the database */
    let listing = new Listing();
    listing.code = req.body.code;
    listing.name = req.body.name;

    if(req.body.address){
        listing.address = req.body.address;
        if(req.results != null){
            listing.coordinates.latitude = req.results.lat;
            listing.coordinates.longitude = req.results.lng;
        }
    }

    listing.save(function (err, Listing) {
        if(err){
            res.send(err);
        } else {
            res.json(Listing);
        }
    });
};

/* Show the current listing */
export const read = (req, res) => {
    /* send back the listing as json from the request */
    /* If the listing could _not_ be found, be sure to send back a response in the following format: {error: 'Some message that indicates an error'} */
    if(req.item === null){
        res.send("listing could not be found.");
    } else {
        res.json(req.item);
    }
};

/* Update a listing - note the order in which this function is called by the router*/
export const update = (req, res) => {

    const listing = req.item;

    listing.code = req.body.code;
    listing.name = req.body.name;

    if(req.body.address){
        listing.address = req.body.address;
        if(req.results != null){
            listing.coordinates.latitude = req.results.lat;
            listing.coordinates.longitude = req.results.lng;
        }
    }

    listing.save(function (err, Listing) {
        if(err){
            res.send(err);
        } else {
            res.json(Listing);
        }
    });
    /* Replace the listings's properties with the new properties found in req.body */

    /*save the coordinates (located in req.results if there is an address property) */

    /* Save the listing */
};

/* Delete a listing */
export const remove = (req, res) => {
    /* Add your code to remove the listins */
    /* If the listing could _not_ be found, be sure to send back a response in the following format: {error: 'Some message that indicates an error'} */
    Listing.find({
        id: req.params.listingId}).remove( function (err, Listing) {
        if (err)
            res.send("listing could not removed");
    res.send(Listing);
    });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
export const list = (req, res) => {
    /* Add your code. Make sure to send the documents as a JSON response.*/
    Listing.find().sort({code: 1})
    .then(listings => {
        res.json(listings);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving listings."
        });
    });
};

/* 
  Middleware: find a listing by its ID, then pass it to the next request handler. 

  HINT: Find the listing using a mongoose query, 
        bind it to the request object as the property 'listing', 
        then finally call next
 */
export const listingByID = (req, res, next) => {
    if (req.params.listingId) {
        Listing.findById(req.params.listingId, function (err, listing) {
          if (err) {
            req.item = null;
            next();
            return;
          }    
          req.item = listing;
          next();
        });
      } else {
        next();
      }
};
