'use strict';

var _ = require('lodash');
var Raw = require('./raw.model');

// Get municipalities
exports.municipalities = function(req, res) {
  Raw.find().distinct('municipality', function (err, raws) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(raws);
  });
};

exports.aggregate_sales = function(req, res){
  var topMunicipalities;
  Raw.aggregate(
  [
        {
          $group : {
             _id :  "$municipality",
             totalPrice: { $sum: "$value" },
             soldCount: { $sum: 1 }
          }
        },
        { $sort : { soldCount : -1}},
        { $limit: 7}
  ], function(err, raws) {
      if(err) { return handleError(res, err); }
      topMunicipalities = raws.map(function(raw){return raw._id});

      Raw.aggregate(
        [
          {$match : { municipality : {$in: topMunicipalities }}},
          {
            $group : {
               _id : { sold_date: "$sold_date", municipality: "$municipality"},
               totalPrice: { $sum: "$value" },
               soldCount: { $sum: 1 }
            }},
            {
            $group : {
               _id : "$_id.sold_date",
                municipality: { 
                    "$push": { 
                        "municipality": "$_id.municipality",
                        "count": "$soldCount",
                        "price": "$totalPrice"
                    },
                }
            }
          },
          { $sort : { _id : -1}}
       ]
       , function(err, raws) {
          if(err) { return handleError(res, err); }
          return res.status(200).json(raws);
         }
      );
    }
  );
}

// Get list of raws
exports.index = function(req, res) {
  Raw.find(req.query, null, function (err, raws) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(raws.sort(function(a,b){
      return Math.round((b.sold_date_as_date-a.sold_date_as_date)/(1000*60*60*24))
    }));
  });
};

// Get a single raw
exports.show = function(req, res) {
  Raw.findById(req.params.id, function (err, raw) {
    if(err) { return handleError(res, err); }
    if(!raw) { return res.status(404).send('Not Found'); }
    return res.json(raw);
  });
};

// Creates a new raw in the DB.
exports.create = function(req, res) {
  Raw.create(req.body, function(err, raw) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(raw);
  });
};

// Updates an existing raw in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Raw.findById(req.params.id, function (err, raw) {
    if (err) { return handleError(res, err); }
    if(!raw) { return res.status(404).send('Not Found'); }
    var updated = _.merge(raw, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(raw);
    });
  });
};

// Deletes a raw from the DB.
exports.destroy = function(req, res) {
  Raw.findById(req.params.id, function (err, raw) {
    if(err) { return handleError(res, err); }
    if(!raw) { return res.status(404).send('Not Found'); }
    raw.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}