'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RawSchema = new Schema({
  mls_id: String,
  status: String,
  sold_date: String,
  style: String,
  bathrooms: Number,
  zip: String,
  contract_date: String,
  listed: Number,
  bedrooms: Number,
  municipality: String,
  long: Number,
  value: Number,
  address: String,
  lat: Number,
  type: String,
  apt_num: String
}, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true 
  }});

RawSchema.virtual('sold_date_as_date')
.get(function () {
  return new Date(this.sold_date);
});

RawSchema.virtual('list_date')
.get(function () {
  return new Date(this.contract_date);
});

RawSchema.virtual('days_on_market')
.get(function () {
  return Math.round((this.sold_date_as_date-this.list_date)/(1000*60*60*24));
});

RawSchema.virtual('difference')
.get(function () {
  return this.value - this.listed;
});

module.exports = mongoose.model('Raw', RawSchema);