/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Raw = require('./raw.model');

exports.register = function(socket) {
  Raw.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Raw.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('raw:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('raw:remove', doc);
}